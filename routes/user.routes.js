import { Router } from "express";
import { Controller } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *       -  id
 *       -  fullname
 *       -  email
 *       -  password
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a post
 *         fullname:
 *           type: string
 *           description: id of author
 *         email:
 *           type: string
 *           descripton: content of post *
 *         password:
 *           type: string
 *           descripton: content of post *
 *       example:
 *         id: stuff
 *         fullname: other stuff
 *         email: my article
 *         password: 123-920921
 *
 */

const userRouter = Router();
const userController = new Controller();
// Retrieve all users

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns all Users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: the list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get("/", verifyToken, userController.findAll);
// Create a new user

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
userRouter.post("/", userController.create);
//banker class
// Retrieve a single user with id
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: gets user by id
 *     tags: [User]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of user
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: user by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: user can not be found
 */
userRouter.get("/:id", verifyToken, userController.findOne);
// Update a user with id
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: updates users by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         decsription: The post was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: user was not found.
 *       500:
 *         description: Some errors happend.
 *
 */
userRouter.put("/:id", verifyToken, userController.update);
// Delete a user with id
/**
 * @swagger
 *  /users/{id}:
 *    delete:
 *      summary: removes post from array
 *      tags: [User]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: user id
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *        200:
 *          description: The user was deleted
 *        404:
 *          description: The user was not found
 *
 */
userRouter.delete("/:id", verifyToken, userController.delete);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Sign in to account
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
userRouter.post("/login/", userController.sign_in);

export default userRouter;
