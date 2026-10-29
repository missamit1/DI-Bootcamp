import unittest
from langchain_core.messages import AIMessage, HumanMessage
from baristabot import build_graph, initial_state, make_order_node


def call(name, **args):
    return {'name': name, 'args': args, 'id': name + str(args), 'type': 'tool_call'}


class FakeModel:
    def __init__(self, responses):
        self.responses = iter(responses)
    def bind_tools(self, tools):
        return self
    def invoke(self, messages):
        return next(self.responses)


class BaristaTests(unittest.TestCase):
    def node(self, state, calls, answers=()):
        replies = iter(answers)
        node = make_order_node(lambda _: next(replies), lambda _: None)
        return node({**state, 'messages': [AIMessage(content='', tool_calls=calls)]})

    def test_guard_and_validation(self):
        state = initial_state()
        result = self.node(state, [call('place_order'), call('add_to_order', drink='Latte', modifiers=['Soy'])])
        self.assertFalse(result['placed'])
        self.assertEqual(result['order'], [])
        self.assertEqual(state['order'], [])

    def test_confirm_modify_and_reconfirm(self):
        state = self.node(initial_state(), [call('add_to_order', drink='Latte', modifiers=['Oat']), call('confirm_order')], ['yes'])
        changed = self.node(state, [call('add_to_order', drink='Green Tea', modifiers=[]), call('place_order')])
        self.assertFalse(changed['placed'])
        declined = self.node(changed, [call('confirm_order'), call('place_order')], ['change the milk'])
        self.assertFalse(declined['placed'])
        placed = self.node(declined, [call('confirm_order'), call('place_order'), call('clear_order')], ['yes'])
        self.assertTrue(placed['placed'])
        self.assertEqual(len(placed['order']), 2)
        self.assertEqual(len(placed['messages']), 3)

    def test_clear_get_quit(self):
        state = self.node(initial_state(), [call('add_to_order', drink='Espresso', modifiers=[]), call('get_order')])
        self.assertIn('Espresso', state['messages'][-1].content)
        cleared = self.node(state, [call('clear_order'), call('confirm_order')])
        self.assertEqual(cleared['order'], [])
        quit_state = self.node(state, [call('confirm_order'), call('place_order')], [' Q '])
        self.assertTrue(quit_state['finished'])
        self.assertFalse(quit_state['placed'])

    def test_full_graph_mixed_tools(self):
        model = FakeModel([
            AIMessage(content='', tool_calls=[call('get_menu'), call('add_to_order', drink='Latte', modifiers=['Oat'])]),
            AIMessage(content='', tool_calls=[call('confirm_order')]),
            AIMessage(content='', tool_calls=[call('place_order')]),
        ])
        replies = iter(['One oat latte', 'yes'])
        graph = build_graph(model, input_fn=lambda _: next(replies), output_fn=lambda _: None)
        result = graph.invoke(initial_state(), {'recursion_limit': 100})
        self.assertTrue(result['placed'])
        self.assertIn('Goodbye', result['messages'][-1].content)
        tool_ids = [m.tool_call_id for m in result['messages'] if m.type == 'tool']
        self.assertEqual(len(tool_ids), 4)
        self.assertEqual(len(result['order']), 1)

    def test_single_turn_and_second_turn(self):
        graph = build_graph(FakeModel([AIMessage(content='Hello'), AIMessage(content='Menu questions welcome')]), 'single')
        state = initial_state() | {'messages': [HumanMessage(content='Hi')]}
        state = graph.invoke(state)
        self.assertEqual(len(state['messages']), 2)
        state['messages'].append(HumanMessage(content='Can I ask about coffee?'))
        self.assertEqual(len(graph.invoke(state)['messages']), 4)

    def test_menu_toolnode_and_human_exit(self):
        replies = iter(['menu', 'quit'])
        model = FakeModel([AIMessage(content='', tool_calls=[call('get_menu')]), AIMessage(content='Here is the menu')])
        result = build_graph(model, 'menu', lambda _: next(replies), lambda _: None).invoke(initial_state())
        self.assertTrue(result['finished'])
        self.assertTrue(any(m.type == 'tool' and 'Soy milk' in m.content for m in result['messages']))
        result = build_graph(FakeModel([]), 'human', lambda _: 'EXIT', lambda _: None).invoke(initial_state())
        self.assertTrue(result['finished'])


if __name__ == '__main__':
    unittest.main()
