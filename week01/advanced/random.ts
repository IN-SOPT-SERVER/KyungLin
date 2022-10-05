import { Member } from './member';
import { Dinner } from './dinner';

const dinner: Dinner = {
  member: [
    {
      name: '김경린',
      group: 'yb',
    },
    {
      name: '김소현',
      group: 'ob',
    },
    {
      name: '전선희',
      group: 'yb',
    },
    {
      name: '김동재',
      group: 'ob',
    },
  ],
  menu: ['한식', '중식', '양식'],
  shuffle(array: Member[] | string[]) {
    array.sort(() => Math.random() - 0.5);
    return array;
  },
  organize(array: Member[], menuArray: string[]) {
    this.shuffle(array);
    this.shuffle(menuArray);
    const dinnerMember: Member[] = array;
    const menu: string[] = menuArray;
    console.log(
      `결과 ${dinnerMember[0].name}, ${dinnerMember[1].name} 메뉴: ${menu[0]}`
    );
  },
};

dinner.organize(dinner.member, dinner.menu);
