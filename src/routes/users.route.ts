import { Router } from "express";
import * as usersController from "./../controllers/users.controller";

const router = Router();

router.route("/").get(usersController.getUsers).post(usersController.createUser);
router.route("/:id").delete(usersController.deleteUser).put(usersController.updateUser);

export default router;
