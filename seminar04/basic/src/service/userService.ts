import { UserCreateDTO } from './../interfaces/UserCreateDto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { sc } from '../constants';
import { UserSignInDTO } from '../interfaces/UserSignInDto';
import { UserUpdateDto } from '../interfaces/UserUpdateDto';
import { UserResponseDto } from '../interfaces/UserResponseDto';

const prisma = new PrismaClient();

//* 유저 생성
const createUser = async (userCreateDto: UserCreateDTO) => {
  const salt = await bcrypt.genSalt(10); //^ 매우 작은 임의의 랜덤 텍스트 salt
  const password = await bcrypt.hash(userCreateDto.password, salt); //^ 위에서 랜덤을 생성한 salt를 이용해 암호화

  const user = await prisma.user.create({
    data: {
      name: userCreateDto?.name,
      age: userCreateDto?.age,
      email: userCreateDto.email,
      password,
    },
  });

  return user;
};
//* 유저 전체 조회
const getAllUser = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  const data: UserResponseDto[] = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      age: user.age,
      email: user.email,
    };
  });
  return data;
};

//* 유저 정보 수정
const updateUser = async (userId: number, userUpdateDto: UserUpdateDto) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: userUpdateDto.name,
      age: userUpdateDto.age,
      email: userUpdateDto.email,
    },
  });

  const data: UserResponseDto = {
    id: user.id,
    name: user.name,
    age: user.age,
    email: user.email,
  };

  return data;
};
//* 유저 삭제
const deleteUser = async (userId: number) => {
  const data = await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return data;
};

//* userId로 유저 조회
const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const data: UserResponseDto = {
    id: user.id,
    name: user.name,
    age: user.age,
    email: user.email,
  };
  return data;
};

//* 로그인
const signIn = async (userSignInDto: UserSignInDTO) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: userSignInDto.email,
      },
    });
    if (!user) return null;

    //? bcrypt가 DB에 저장된 기존 password와 넘겨 받은 password를 대조하고,
    //? match false시 401을 리턴
    const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
    if (!isMatch) return sc.UNAUTHORIZED;

    return user.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const userService = {
  getUserById,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  signIn,
};

export default userService;
