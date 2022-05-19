function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
 
greet("Maddison", new Date());

const constString = "hello";

function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}

interface Container {
  value: number | null | undefined;
}
 
function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) { // null == undefined
    console.log(container.value);
                           
    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}

interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
interface Triangle {
  kind: "triangle";
  sideLength: number;
}
 
type Shape = Circle | Square | Triangle;
 
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "triangle":
      return shape.sideLength * shape.sideLength / 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

type GreetFunction = (s: string) => void;

function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
 
function printToConsole(s: string) {
  console.log(s);
}
 
greeter(printToConsole);

// Call Signatures
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething2(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

// Construct Signatures
type SomeConstructor = {
  new (s: string): Date;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}

// Some objects, like JavaScript’s Date object, can be called with or without new. 
// You can combine call and construct signatures in the same type arbitrarily:
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}

// Generic Functions
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
// s is of type 'string'
const s = firstElement(["a", "b", "c"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type undefined
const u = firstElement([]);

// Generic inference
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}
 
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));