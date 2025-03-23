const express = require("express");
const { createUser, getUsers, findUser, followUser, deleteUser, updateUser } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { login } = require("../controllers/authController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas a usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário (único)
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         followers:
 *           type: array
 *           description: Lista de IDs dos usuários que seguem este usuário
 *           items:
 *             type: string
 *         following:
 *           type: array
 *           description: Lista de IDs dos usuários que este usuário segue
 *           items:
 *             type: string
 *       example:
 *         name: "João Silva"
 *         email: "joao@example.com"
 *         password: "senha123"
 *         followers: ["65b8f...", "65b8f..."]
 *         following: ["65b8f...", "65b8f..."]
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do usuário
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *             example:
 *               name: "João Silva"
 *               email: "joao@example.com"
 *               password: "senha123"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Erro ao criar o usuário
 */
router.post("/add", createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtém todos os usuários
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuários encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Nenhum usuário encontrado
 */
router.get("/", getUsers);

/**
 * @swagger
 * /users/find/{name}:
 *   get:
 *     summary: Busca um usuário pelo nome
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do usuário a ser buscado
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/find/:name", findUser);

/**
 * @swagger
 * /users/follow:
 *   post:
 *     summary: Segue um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followerId:
 *                 type: string
 *                 description: ID do usuário que está seguindo
 *               followingId:
 *                 type: string
 *                 description: ID do usuário que será seguido
 *             example:
 *               followerId: "65b8f..."
 *               followingId: "65b8f..."
 *     responses:
 *       200:
 *         description: Usuário seguido com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 */
router.post("/follow", authMiddleware, followUser);

/**
 * @swagger
 * /users/{name}:
 *   delete:
 *     summary: Exclui um usuário pelo nome
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do usuário a ser excluído
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:name", deleteUser);

/**
 * @swagger
 * /users/{name}:
 *   put:
 *     summary: Atualiza um usuário pelo nome
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updates:
 *                 type: object
 *                 description: Campos a serem atualizados no usuário
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *             example:
 *               updates:
 *                 name: "João Silva Atualizado"
 *                 email: "joaoatualizado@example.com"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:name", updateUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário
 *               password:
 *                 type: string
 *                 description: Senha do usuário
 *             example:
 *               email: "joao@example.com"
 *               password: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado após o login
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Credenciais inválidas
 */
router.post("/login", login);

module.exports = router;