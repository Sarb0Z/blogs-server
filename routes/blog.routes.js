import { Router } from "express";
import { Controller } from "../controllers/blog.controller.js";
import { verifyToken } from "../middleware/auth.js";
/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *       -  id
 *       -  author
 *       -  title
 *       -  date_modified
 *       -  article
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a post
 *         author:
 *           type: string
 *           description: id of author
 *         title:
 *           type: string
 *           descripton: content of post 
 *         date_modified:
 *           type: date
 *           descripton: content of post 
 *         article:
 *           type: string
 *           descripton: content of post 
 *       example:
 *         id: 98123094-32-4
 *         author : Ibrahim
 *         title: "my struggle" 
 *         date_modified : 2/10/2022
 *         article: "bla bla bla yada yada lorem ipsum etc et cetera" 
 *
 */

 const blogRouter = Router();
 const blogController = new Controller();

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Returns all Users
 *     tags: [Blog]
 *     responses:
 *       200:
 *         description: the list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
 blogRouter.get("/", blogController.findAll);
// Create a new Follow

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new user
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Some server error
 */
 blogRouter.post("/", blogController.create);
 //banker class
 // Retrieve a single user with id
 /**
  * @swagger
  * /blogs/{id}:
  *   get:
  *     summary: gets user by id
  *     tags: [Blog]
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
  *               $ref: '#/components/schemas/Blog'
  *       400:
  *         description: user can not be found
  */
 blogRouter.get("/:id", verifyToken, blogController.findOne);
 // Update a user with id
 /**
  * @swagger
  * /blogs/{id}:
  *   put:
  *     summary: updates users by id
  *     tags: [Blog]
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
  *             $ref: '#/components/schemas/Blog'
  *     responses:
  *       200:
  *         decsription: The post was updated
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Blog'
  *       404:
  *         description: user was not found.
  *       500:
  *         description: Some errors happend.
  *
  */
 blogRouter.put("/:id", verifyToken, blogController.update);
 // Delete a user with id
 /**
  * @swagger
  *  /blogs/{id}:
  *    delete:
  *      summary: removes post from array
  *      tags: [Blog]
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
 blogRouter.delete("/:id", verifyToken, blogController.delete);

 export default blogRouter;
