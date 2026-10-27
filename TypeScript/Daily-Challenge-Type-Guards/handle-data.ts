type User = {
  type: "user";
  name: string;
  age: number;
};

type Product = {
  type: "product";
  id: number;
  price: number;
};

type Order = {
  type: "order";
  orderId: string;
  amount: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isUser(value: unknown): value is User {
  return isRecord(value)
    && value.type === "user"
    && typeof value.name === "string"
    && typeof value.age === "number"
    && Number.isFinite(value.age);
}

function isProduct(value: unknown): value is Product {
  return isRecord(value)
    && value.type === "product"
    && typeof value.id === "number"
    && Number.isFinite(value.id)
    && typeof value.price === "number"
    && Number.isFinite(value.price);
}

function isOrder(value: unknown): value is Order {
  return isRecord(value)
    && value.type === "order"
    && typeof value.orderId === "string"
    && typeof value.amount === "number"
    && Number.isFinite(value.amount);
}

function handleData(data: (User | Product | Order)[]): string[] {
  if (!Array.isArray(data)) {
    return ["Invalid input: expected an array."];
  }

  return data.map((item) => {
    if (isUser(item)) {
      return `Hello, ${item.name}! You are ${item.age} years old.`;
    }
    if (isProduct(item)) {
      return `Product ${item.id} costs ${item.price}.`;
    }
    if (isOrder(item)) {
      return `Order ${item.orderId} has a total amount of ${item.amount}.`;
    }
    return "Unknown or invalid data item.";
  });
}

const data: (User | Product | Order)[] = [
  { type: "user", name: "Alice", age: 25 },
  { type: "product", id: 101, price: 19.99 },
  { type: "order", orderId: "ORD-001", amount: 59.97 },
];

for (const message of handleData(data)) {
  console.log(message);
}
