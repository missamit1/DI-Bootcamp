import os
from typing import Annotated
from typing_extensions import TypedDict
from langchain_core.messages import AIMessage, HumanMessage, ToolMessage
from langchain_core.tools import tool
from langgraph.graph import START, END, StateGraph
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode
from langchain_google_genai import ChatGoogleGenerativeAI


class OrderState(TypedDict, total=False):
    messages: Annotated[list, add_messages]
    order: list[str]
    finished: bool
    confirmed: bool
    placed: bool


DRINKS = ['Espresso', 'Americano', 'Cold Brew', 'Latte', 'Cappuccino', 'Cortado',
          'Macchiato', 'Mocha', 'Flat White', 'English Breakfast Tea', 'Green Tea',
          'Earl Grey', 'Chai Latte', 'Matcha Latte', 'London Fog', 'Steamer', 'Hot Chocolate']
MODIFIERS = ['Whole', '2%', 'Oat', 'Almond', '2% Lactose Free', 'Single', 'Double',
             'Triple', 'Quadruple', 'Decaf', 'Regular', 'Hot', 'Iced', 'vanilla sweetener',
             'hazelnut sweetener', 'caramel sauce', 'chocolate sauce',
             'sugar free vanilla sweetener', 'sugar', 'extra hot', 'one pump',
             'half caff', 'extra foam', 'dirty']
WELCOME_MSG = 'Welcome to the BaristaBot cafe. Type q to quit. How may I serve you today?'
BARISTABOT_SYSINT = ('system',
    'You are BaristaBot, a friendly simulated cafe assistant. Discuss only menu products and their history. '
    'Call get_menu before recommending or adding drinks. Use exact available drink and modifier names; '
    'ask for clarification rather than inventing products. Use add_to_order, get_order and clear_order '
    'to manage the order. To modify an item, get_order, clear_order and rebuild the complete desired order. '
    'Call confirm_order when the customer is ready. Its response may request changes: apply them and '
    'confirm again. Only call place_order after explicit confirmation. Never claim the order was sent '
    'unless place_order succeeds. All kitchen actions are simulated. Prefer one tool call at a time.')


@tool
def get_menu() -> str:
    """Return the current cafe menu and available modifiers."""
    return ('MENU\nDrinks: ' + ', '.join(DRINKS) + '\nModifiers: ' + ', '.join(MODIFIERS)
            + '\nDefaults: whole milk, double espresso, regular caffeine, hot. '
            'Regular milk means Whole; sweetened means sugar. Dirty adds an espresso shot. '
            'Soy milk is out of stock. For special requests outside the listed examples, ask the cafe staff.')


@tool
def add_to_order(drink: str, modifiers: list[str]) -> str:
    """Add a menu drink with available modifiers to the order."""
    raise RuntimeError('Handled by the ordering node')


@tool
def get_order() -> str:
    """Retrieve the current order."""
    raise RuntimeError('Handled by the ordering node')


@tool
def clear_order() -> str:
    """Clear all order items before rebuilding a modified order."""
    raise RuntimeError('Handled by the ordering node')


@tool
def confirm_order() -> str:
    """Show the exact order and ask the customer to confirm or request changes."""
    raise RuntimeError('Handled by the ordering node')


@tool
def place_order() -> str:
    """Place a nonempty, confirmed order in the simulated kitchen."""
    raise RuntimeError('Handled by the ordering node')


ORDER_TOOLS = [add_to_order, get_order, clear_order, confirm_order, place_order]
MENU_NODE = ToolNode([get_menu])
QUIT = {'q', 'quit', 'exit', 'goodbye'}


def initial_state():
    return {'messages': [], 'order': [], 'finished': False, 'confirmed': False, 'placed': False}


def create_model():
    if not os.environ.get('GOOGLE_API_KEY'):
        raise ValueError('Set GOOGLE_API_KEY in notebook secrets or your environment first.')
    return ChatGoogleGenerativeAI(model=os.getenv('GEMINI_MODEL', 'gemini-2.5-flash'), temperature=0)


def make_order_node(input_fn=input, output_fn=print):
    def order_node(state):
        order = list(state.get('order', []))
        confirmed = state.get('confirmed', False)
        finished = state.get('finished', False)
        placed = state.get('placed', False)
        results = []
        for call in state['messages'][-1].tool_calls:
            name, args = call['name'], call['args']
            if finished:
                response = 'Conversation closed; no further order changes accepted.'
            elif name == 'get_menu':
                # Mixed menu/order batches still use the real ToolNode, one call at a time.
                result = MENU_NODE.invoke({'messages': [AIMessage(content='', tool_calls=[call])]})
                results.extend(result['messages'])
                continue
            elif name == 'add_to_order':
                drink, mods = args.get('drink'), args.get('modifiers', [])
                if drink not in DRINKS or not isinstance(mods, list) or any(m not in MODIFIERS for m in mods):
                    response = 'Unavailable drink or modifier. Call get_menu and clarify with the customer.'
                else:
                    order.append(f"{drink} ({', '.join(mods) if mods else 'default modifiers'})")
                    confirmed = False
                    response = '\n'.join(order)
            elif name == 'get_order':
                response = '\n'.join(order) or '(no order)'
            elif name == 'clear_order':
                order = []
                confirmed = False
                response = 'Order cleared.'
            elif name == 'confirm_order':
                confirmed = False
                if not order:
                    response = 'Cannot confirm an empty order.'
                else:
                    output_fn('Your order:\n' + '\n'.join(order))
                    response = input_fn('Is this correct? Type yes, request changes, or q to quit: ')
                    answer = response.strip().lower()
                    confirmed = answer in {'yes', 'y', 'confirm', 'confirmed'}
                    finished = answer in QUIT
            elif name == 'place_order':
                if not order or not confirmed:
                    response = 'Not placed: a nonempty order needs explicit customer confirmation.'
                else:
                    output_fn('Sending order to simulated kitchen:\n' + '\n'.join(order))
                    finished = placed = True
                    response = 'Order placed. Estimated preparation time: 3 minutes (simulation).'
            else:
                response = f'Unknown tool: {name}. Use the provided tools.'
            results.append(ToolMessage(content=str(response), name=name, tool_call_id=call['id']))
        return {'messages': results, 'order': order, 'confirmed': confirmed,
                'finished': finished, 'placed': placed}
    return order_node


def build_graph(model, stage='ordering', input_fn=input, output_fn=print):
    """Build single-turn, human-loop, menu or complete ordering graphs."""
    if stage not in {'single', 'human', 'menu', 'ordering'}:
        raise ValueError('Unknown graph stage')
    tools = [get_menu] + (ORDER_TOOLS if stage == 'ordering' else [])
    bound = model.bind_tools(tools) if stage in {'menu', 'ordering'} else model

    def chatbot(state):
        if state.get('finished'):
            text = 'Thank you! Your order is placed. Goodbye!' if state.get('placed') else 'Goodbye! No order was placed.'
            output_fn(text)
            return {'messages': [AIMessage(content=text)]}
        if not state.get('messages'):
            return {'messages': [AIMessage(content=WELCOME_MSG)]}
        return {'messages': [bound.invoke([BARISTABOT_SYSINT] + state['messages'])]}

    def human_node(state):
        output_fn('BaristaBot: ' + str(state['messages'][-1].content))
        text = input_fn('You: ')
        return {'messages': [HumanMessage(content=text)], 'finished': text.strip().lower() in QUIT,
                'confirmed': False}

    def route(state):
        if state.get('finished'):
            return END
        calls = getattr(state['messages'][-1], 'tool_calls', [])
        if calls:
            return 'tools' if all(c['name'] == 'get_menu' for c in calls) else 'ordering'
        return 'human'

    graph = StateGraph(OrderState)
    graph.add_node('chatbot', chatbot)
    graph.add_edge(START, 'chatbot')
    if stage == 'single':
        graph.add_edge('chatbot', END)
    else:
        graph.add_node('human', human_node)
        graph.add_edge('human', 'chatbot')
        if stage == 'human':
            graph.add_conditional_edges('chatbot', lambda s: END if s.get('finished') else 'human', ['human', END])
        else:
            graph.add_node('tools', MENU_NODE)
            graph.add_edge('tools', 'chatbot')
            if stage == 'ordering':
                graph.add_node('ordering', make_order_node(input_fn, output_fn))
                graph.add_edge('ordering', 'chatbot')
                graph.add_conditional_edges('chatbot', route, ['tools', 'ordering', 'human', END])
            else:
                graph.add_conditional_edges('chatbot', route, ['tools', 'human', END])
    return graph.compile()


if __name__ == '__main__':
    build_graph(create_model()).invoke(initial_state(), {'recursion_limit': 100})
