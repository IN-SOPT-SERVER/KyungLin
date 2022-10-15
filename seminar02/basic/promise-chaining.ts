// promise-chaining.ts

//* 아침에 힘겹게 일어나는 여러분을 표현한 함수
const me = (callback: () => void, time: number) => {
  setTimeout(callback, time);
};

//* 기상
const wakeUp = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    me(() => {
      console.log('[현재] 기상');
      resolve('기상');
    }, 3000);
  });
};

const goBathRoom = (now: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    me(() => {
      console.log('[현재] 화장실로 이동함');
      resolve(`${now} -> 화장실로 이동함`);
    }, 1000);
  });
};

const startChicka = (now: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    me(() => {
      console.log('[현재] 치카치카 중');
      resolve(`${now} -> 치카치카`);
    }, 1000);
  });
};

const goodJob = (now: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    me(() => {
      console.log('[현재] 나 자신 칭찬');
      resolve(`${now} -> 잘했다`);
    }, 1000);
  });
};

wakeUp()
  .then((now) => goBathRoom(now))
  .then((now) => startChicka(now))
  .then((now) => goodJob(now))
  .then((now) => console.log(`\n${now}`));
