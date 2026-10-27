// Exercise 1
type Person = { name: string; age: number };
type Address = { street: string; city: string };
type PersonWithAddress = Person & Address;

const personWithAddress: PersonWithAddress = {
  name: "Alice",
  age: 30,
  street: "10 Main Street",
  city: "London",
};
console.log(personWithAddress);

// Exercise 2
function describeValue(value: number | string): string {
  if (typeof value === "number") {
    return "This is a number";
  }
  return "This is a string";
}
console.log(describeValue(42));
console.log(describeValue("hello"));

// Exercise 3
const someValue: any = "Hello, TypeScript!";
const stringValue: string = someValue as string;
console.log(stringValue.toUpperCase());

// Exercise 4
function getFirstElement(values: (number | string)[]): string {
  if (values.length === 0) {
    return "";
  }
  const first = values[0];
  if (typeof first === "string") {
    return first as string;
  }
  return String(first);
}
console.log(getFirstElement(["hello", 42]));
console.log(getFirstElement([42, "hello"]));

// Exercise 5
function logLength<T extends { length: number }>(value: T): void {
  console.log(value.length);
}
logLength("hello");
logLength([1, 2, 3]);

// Exercise 6
type Job = { position: string; department: string };
type Employee = Person & Job;
type Manager = Employee & { position: "Manager" };
type Developer = Employee & { position: "Developer" };

function isManager(employee: Employee): employee is Manager {
  return employee.position === "Manager";
}

function isDeveloper(employee: Employee): employee is Developer {
  return employee.position === "Developer";
}

function describeEmployee(employee: Employee): string {
  if (isManager(employee)) {
    return `${employee.name} manages the ${employee.department} department.`;
  }
  if (isDeveloper(employee)) {
    return `${employee.name} develops software in the ${employee.department} department.`;
  }
  return `${employee.name} works as a ${employee.position} in the ${employee.department} department.`;
}
console.log(describeEmployee({ name: "Alice", age: 30, position: "Manager", department: "Sales" }));
console.log(describeEmployee({ name: "Bob", age: 25, position: "Developer", department: "Engineering" }));

// Exercise 7
function formatInput<T extends { toString(): string }>(value: T): string {
  const text = value.toString() as string;
  return text.trim();
}
console.log(formatInput("  hello  "));
console.log(formatInput(123));
console.log(formatInput(true));
