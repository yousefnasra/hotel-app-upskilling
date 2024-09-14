import { Request, Response } from "express";
import {
  createNewUser,
  deleteUserWithId,
  getAllUsers,
  updateUserWithId,
} from "../services/users.service";
import prisma from "../prisma";

export const getUsers = async (req: Request, res: Response) => {
  try {
    // get users data (from users service)
    const users = await getAllUsers();
    res.status(200).json({ message: "users founded succefully!", users });
  } catch (error) {
    res.status(500).json({ error: "failed to get users!" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    // delete user data (from users service)
    await deleteUserWithId(+id);
    res.status(200).json({ message: "user deleted succefully!" });
  } catch (error) {
    res.status(500).json({ error: `failed to delete user with id ${id}!` });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    // create user data (from users service)
    const { name, email, isAdmin } = req.body;
    // create new user
    const newUser = await createNewUser({ user:{name,email,isAdmin}, email});
    res.status(201).json({ message: "user created succefully!", newUser });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: errMsg });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // update user data (from users service)
    const id = req.params.id;
    const { name, isAdmin } = req.body;
    // update user
    const updatedUser = await updateUserWithId({id: +id, data: { name, isAdmin }});
    res.status(200).json({ message: "user updated succefully!", updatedUser });
  } catch (error) {
    res.status(500).json({ error: `failed to update user!` });
  }
};
