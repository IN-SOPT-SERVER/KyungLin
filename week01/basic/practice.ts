// ~~는 ~살이고 ~에 살고있고 ~~를 좋아합니다!

interface introduce {
  name: string;
  age: number;
  live: string;
  like: string;
  mbti: string;
}
const members: introduce[] = [
  {
    name: '김소현',
    age: 23,
    live: '상도',
    like: '방탈출',
    mbti: 'esfp',
  },
  {
    name: '김동재',
    age: 23,
    live: '상봉',
    like: '치킨',
    mbti: 'enfp',
  },
  {
    name: '전선희',
    age: 23,
    live: '계봉',
    like: '피자',
    mbti: 'intj',
  },
];

members.map((member: introduce) => {
  console.log(
    `${member.name}는 ${member.age}살이고 mbti는 ${member.mbti}이고 ${member.live}에 살고있고 ${member.like}를 좋아합니다.`
  );
});
