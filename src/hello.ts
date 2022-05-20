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
  new(s: string): Date;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}

// Some objects, like JavaScript’s Date object, can be called with or without new. 
// You can combine call and construct signatures in the same type arbitrarily:
interface CallOrConstruct {
  new(s: string): Date;
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

function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
const longerArray = longest([1, 2], [1, 2, 3]);
const longerString = longest("alice", "bob");

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
const arr = combine<string | number>([1, 2, 3], ["hello"]);

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}

// declare this
interface User {
  id: number;
  admin: boolean;
  becomeAdmin: () => void;
}
const user = {
  id: 123,
  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};

interface DB {
  filterUsers: (filter: (this: User) => boolean) => User[];
}

function getDB(): DB {
  return {
    filterUsers: function (filter) {
      return this.users.filter(filter);
    },
  };
}

const db = getDB();
const admins = db.filterUsers(function (this: User) {
  return this.admin;
})

function noop() {
  return;
}

// unknown
function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Need to be careful with 'obj'!
// const obj = safeParse(someRandomString);

// never
function fail(msg: string): never {
  throw new Error(msg);
}
function fn2(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}

function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);

const args = [8, 5] as const;
const angle = Math.atan2(...args);


// Assignability of Functions
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
  return true;
};

const v1 = f1();

const v2 = f2();

const v3 = f3();

/**
 * mapping modifiers
 */
// Removes 'readonly' attributes from a type's properties
type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

// Removes 'optional' attributes from a type's properties
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User2 = Concrete<MaybeUser>;

// re-map keys
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
};

type Setters<Type> = {
  [Property in keyof Type as `set${Capitalize<string & Property>}`]: (value: Type[Property]) => void
}

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;
type lazyPerson2 = Setters<Person>;

type syntheticPerson = Person & LazyPerson & lazyPerson2;

const p = {} as syntheticPerson;
p.setName('hjf');

// Remove the 'kind' property
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;

//
type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
}

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>

//
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;

/**
 * index signature
 */
interface NumberDictionary {
  readonly [index: string]: number | string;
  length: number;
  name: string;
}

let myDic: NumberDictionary = { name: 'hjf', length: 1, 0: 'hjf' };
myDic.name = '132';

/**
 * extend types
 */
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}

// 
interface Colorful {
  color: string;
}

interface Circle2 {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle2 { }

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};

type ColorfulCircle2 = Colorful & Circle2;

/**
 * generic
 */
interface Box<Type> {
  contents: Type;
}

function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}

type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

/**
 * readonlyarray
 */
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

/**
 * tuple types
 */
type StringNumberPair = [string, number];

function doSomething3(stringHash: [string, number]) {
  const [inputString, hash] = stringHash;
}

doSomething3(["hello", 42]);

//
interface StringNumberPair2 {
  // specialized properties
  length: 2;
  0: string;
  1: number;

  // Other 'Array<string | number>' members...
  slice(start?: number, end?: number): Array<string | number>;
}
const snp: StringNumberPair2 = ["hello", 42];

//
type StringNumberBooleans = [string, number, ...boolean[]];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];

//
function readButtonInput(name: string, version: number, ...input: boolean[]) {
  // ...
}
