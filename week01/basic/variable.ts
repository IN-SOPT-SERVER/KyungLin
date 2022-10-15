const isLiked: boolean = true;
console.log(`${typeof isLiked}, ${isLiked}`);

const str: string = 'hellpppp';
console.log(`${typeof str}`);

let num: number = 3;
console.log(`${typeof num}, ${num}`);

let numbers: number[] = [1, 2, 3];

const strings: Array<String> = ['hi', 'hello'];

const string: string[] = ['hi', 'hello'];

// Object: 자바스크립트 객체 타입
// object: 타입스크립트 => 원시타입이 아닌 타입들만 할당할 수 있다

const objArray1: Object[] = [{ item1: 'oh' }];
const objArray2: object[] = [{ item1: 'oh1' }];
const objArray = (obj: object) => {
  console.log(obj);
};

console.log(objArray1);
console.log(objArray2);

// console.log(objArray('str'));

const fun = (name: string): void => console.log(`hello`);
const sum = (a: number, b: number): number => a + b;

let a: any = "김경린";
let mainLength = (a as string).length;
console.log(mainLength)


let name2: any = "김경린";
let nameLength: number = (<string>name2).length;