import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* 유저 생성
const createUser = async(name: string, email: string, age: number) => {
  const data = await prisma.user.create({
    data: {
      name,   // userName: name 이면 디비에서는 userName이 필드 이름 그 안에 컨트롤러에서 받은 name 넣음
      email,
      age
    }
  });
  return data;
}
//* 유저 전체 조회
const getAllUser = async() => {
  const data = await prisma.user.findMany();
  return data;
}
//* 유저 정보 수정

const updateUser = async (userId: number, name: string) => {
  const data = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name
    }
  })
  return data;
}
//* 유저 삭제
const deleteUser = async (userId: number) => {
  const data = await prisma.user.delete({
    where: {
      id: userId
    },

  })
  return data;
}

//* userId로 유저 조회
const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

const userService = {
  getUserById,
  createUser,
  getAllUser,
  updateUser,
  deleteUser
};

export default userService;
