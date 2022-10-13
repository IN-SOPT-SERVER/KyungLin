// src/api/members.ts

import express, { Request, Response, Router } from 'express';
// express 모듈에서 express, (request, response, router)-> 타입 정의를 위해 불러옴!

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: '멤버 조회 성공',
    data: {
      members: [
        {
          name: '김도연',
          group: 'ob',
          mbti: 'istp',
          like: '된장찌개',
          live: '대신동(가까운 역이 없다?, 학교 5분거리 부럽,,)',
          age: '23',
          hobby: '배드민턴(배드민턴 스터디)',
          
        },
        {
          name: '김경린',
          group: 'yb',
          mbti: 'isfj',
          like: '초밥',
          live: '백마역',
          age: '24',
          hobby: '산책',
        },
        {
          name: '정준서',
          group: 'ob',
          mbti: 'enfp(엥뿌삐, 술 잘먹음, 지난번 회식 때 아요랑 끝까지 남음)',
          live: '잠실새내역',
          like: '쌀국수 & 백마라탕(매운거 못먹음, 살아있는거는 다 좋아함)',
          age: '23',
          hobby: '노래',
        },
      ],
    },
  });
});

module.exports = router;
