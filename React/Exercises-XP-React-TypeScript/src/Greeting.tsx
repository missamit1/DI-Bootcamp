interface GreetingProps { name: string; messageCount: number }
export default function Greeting({ name, messageCount }: GreetingProps) {
  return <p>Hello, {name}! You have {messageCount} messages.</p>;
}
