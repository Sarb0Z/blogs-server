import { Router } from 'express';
import { Controller } from '../controllers/user.controller.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *       -  id 
 *       -  first_name
 *       -  last_name
 *       -  email
 *       -  phone
 *       -  is_active
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of a post
 *         first_name:
 *           type: string
 *           description: id of author
 *         last_name:
 *           type: string
 *           description: title of post
 *         email:
 *           type: string
 *           descripton: content of post *
 *         is_active:
 *           type: bool
 *           descripton: content of post *
 *       example:
 *         id: 1
 *         first_name: 1
 *         last_name: my title
 *         email: my article
 *         phone: 123920921
 *         is_active: true
 *
 */



const router = Router();
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
router.get('/', userController.findAll);

/**
 * @swagger
 * /users:
 *   User:
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
// Create a new user
router.post('/', userController.create);
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
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: user by its id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: post can not be found
 */
router.get('/:id', userController.findOne);
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
router.put('/:id', userController.update);
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
router.delete('/:id', userController.delete);


export default router