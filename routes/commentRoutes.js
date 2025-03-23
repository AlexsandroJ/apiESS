const express = require("express");
const { createComment, deleteComment } = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Operações relacionadas a comentários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         body:
 *           type: string
 *           description: Conteúdo do comentário (opcional)
 *         owner:
 *           type: string
 *           description: ID do usuário que criou o comentário (referência ao modelo User)
 *         review:
 *           type: string
 *           description: ID da avaliação à qual o comentário pertence (referência ao modelo Review)
 *         likes:
 *           type: array
 *           description: Lista de IDs de usuários que curtiram o comentário
 *           items:
 *             type: string
 *       example:
 *         body: "Este é um comentário incrível!"
 *         owner: "65b8f..."
 *         review: "65b8f..."
 *         likes: ["65b8f...", "65b8f..."]
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /comments/add:
 *   post:
 *     summary: Cria um novo comentário
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: Conteúdo do comentário (opcional)
 *               review:
 *                 type: string
 *                 description: ID da avaliação à qual o comentário pertence
 *             example:
 *               body: "Este é um comentário incrível!"
 *               review: "65b8f..."
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Erro ao criar o comentário
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 */
router.post("/add", authMiddleware, createComment);

/**
 * @swagger
 * /comments/delete:
 *   delete:
 *     summary: Exclui um comentário
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               commentId:
 *                 type: string
 *                 description: ID do comentário a ser excluído
 *             example:
 *               commentId: "65b8f..."
 *     responses:
 *       200:
 *         description: Comentário excluído com sucesso
 *       404:
 *         description: Comentário não encontrado
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 */
router.delete("/delete", authMiddleware, deleteComment);

module.exports = router;