import { UpdateUserDto } from './../dto/user.dto';
import { CreateUserDto } from "../dto/user.dto";
import prisma from "../prisma";

export const getAllUsers = async () => {
  return await prisma.users.findMany();
};

export const deleteUserWithId = async (id: number) => {
  return await prisma.users.delete({
    where: {
      id,
    },
  });
};

export const createNewUser = async ({ user, email }: { user: CreateUserDto; email: string }) => {
  //  Check if email already taken
  const existsEmail = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (existsEmail) throw new Error("Email is already taken!");
  
  return await prisma.users.create({
    data: user,
  });
};

export const updateUserWithId = async ({id,data}:{id:number;data:UpdateUserDto}) => {
  return await prisma.users.update({
    data,
    where:{
      id
    }
  })
};
