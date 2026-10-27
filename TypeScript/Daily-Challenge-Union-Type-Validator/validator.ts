function validateUnionType(value: any, allowedTypes: string[]): boolean {
  for (const allowedType of allowedTypes) {
    if (typeof value === allowedType) {
      return true;
    }
  }

  return false;
}

let userId: string | number = 42;
const allowedIdTypes: string[] = ["string", "number"];

console.log(validateUnionType(userId, allowedIdTypes));
userId = "user-42";
console.log(validateUnionType(userId, allowedIdTypes));

const isActive: boolean = true;
console.log(validateUnionType(isActive, allowedIdTypes));
console.log(validateUnionType(isActive, ["boolean"]));
console.log(validateUnionType({ name: "Alice" }, ["object"]));
console.log(validateUnionType(undefined, ["undefined", "string"]));
console.log(validateUnionType("hello", []));
