import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import { UserCreateDTO } from '../interfaces/UserCreateDto';
import { UserSignInDTO } from '../interfaces/UserSignInDto';
import jwtHandler from '../modules/jwtHandler';
import { userService } from '../service';

//* 유저 생성
const createUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(sc.BAD_REQUEST)
      .send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }
  const userCreateDto: UserCreateDTO = req.body; // 비구조 할당

  const data = await userService.createUser(userCreateDto);
  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SIGNUP_FAIL));
  }
  const accessToken = jwtHandler.sign(data.id);

  const result = {
    id: data.id,
    name: data.name,
    accessToken,
  };
  return res.status(sc.OK).send(success(sc.OK, rm.SIGNUP_SUCCESS, result));
};
//* 유저 전체조회
const getAllUser = async (req: Request, res: Response) => {
  const {page, limit} = req.query;
  const data = await userService.getAllUser(Number(page), Number(limit));

  return res
    .status(sc.OK)
    .send(success(sc.OK, rm.READ_ALL_USERS_SUCCESS, data));
};

//* 유저 정보 수정
const updateUser = async (req: Request, res: Response) => {
  const userUpdateDto = req.body;
  const { userId } = req.params;

  const data = await userService.updateUser(+userId, userUpdateDto);
  if (!data) {
    return res
      .status(sc.BAD_REQUEST)
      .send(success(sc.BAD_REQUEST, rm.UPDATE_USER_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.UPDATE_USER_SUCCESS, data));
};

//* 유저 삭제
const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.deleteUser(+userId);
  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(success(sc.NOT_FOUND, rm.DELETE_USER_FAIL));
  }
  return res.status(200).json({ status: 200, message: '유저 삭제 성공', data });
};

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const data = await userService.getUserById(+userId); // '+userId'userId를 number로 형변환 해준다.

  if (!data) {
    return res
      .status(sc.NOT_FOUND)
      .send(success(sc.NOT_FOUND, rm.READ_USER_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.READ_USER_SUCCESS, data));
};

//* 로그인
const signInUser = async (req: Request, res: Response) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res
      .status(sc.BAD_REQUEST)
      .send(fail(sc.BAD_REQUEST, rm.BAD_REQUEST));
  }

  const userSignInDto: UserSignInDTO = req.body;

  try {
    const data = await userService.signIn(userSignInDto);

    if (!data)
      return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.NOT_FOUND));
    else if (data === sc.UNAUTHORIZED)
      return res
        .status(sc.UNAUTHORIZED)
        .send(fail(sc.UNAUTHORIZED, rm.INVALID_PASSWORD));

    const accessToken = jwtHandler.sign(data);

    const result = {
      id: data,
      accessToken,
    };

    res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, result));
  } catch (e) {
    console.log(error);
    //? 서버 내부에서 오류 발생
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

const searchUserByName = async (req: Request, res: Response) => {
  const { keyword, option } = req.query;
  const data = await userService.searchUserByName(keyword as string, option as string);
  if (!data) {
    return res
      .status(sc.BAD_REQUEST)
      .send(fail(sc.BAD_REQUEST, rm.SEARCH_USER_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.SEARCH_USER_SUCCESS, data));
};

const userController = {
  getUserById,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
  signInUser,
  searchUserByName,
};

export default userController;
