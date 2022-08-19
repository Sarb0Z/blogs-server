import { Router } from "express";
import { Controller } from "../controllers/follow.controller.js";
import { verifyToken } from "../middleware/auth.js";



// Create a new Follow

/**
 * @swagger
 * /follows:
 *   post:
 *     summary: Create a new user
 *     tags: [Follows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Follows'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Follows'
 *       500:
 *         description: Some server error
 */
 router.post("/", verifyToken, followController.create);
 //banker class
 // Retrieve a single user with id
 /**
  * @swagger
  * /follows/{id}:
  *   get:
  *     summary: gets user by id
  *     tags: [Follows]
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
  *               $ref: '#/components/schemas/Follows'
  *       400:
  *         description: user can not be found
  */
 router.get("/:id", verifyToken, followController.findOne);
 // Update a user with id
 /**
  * @swagger
  * /follows/{id}:
  *   put:
  *     summary: updates users by id
  *     tags: [Follows]
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
  *             $ref: '#/components/schemas/Follows'
  *     responses:
  *       200:
  *         decsription: The post was updated
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Follows'
  *       404:
  *         description: user was not found.
  *       500:
  *         description: Some errors happend.
  *
  */
 router.put("/:id", verifyToken, followController.update);
 // Delete a user with id
 /**
  * @swagger
  *  /follows/{id}:
  *    delete:
  *      summary: removes post from array
  *      tags: [Follows]
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
 router.delete("/:id", verifyToken, userController.delete);