const express = require("express");
const { createReview, getReviews, deleteReview, editReview, likeReview } = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Operações relacionadas a avaliações
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título da avaliação
 *         body:
 *           type: string
 *           description: Corpo da avaliação (opcional)
 *         classification:
 *           type: number
 *           description: Classificação numérica da avaliação
 *         owner:
 *           type: string
 *           description: ID do usuário que criou a avaliação (referência ao modelo User)
 *         likes:
 *           type: array
 *           description: Lista de IDs de usuários que curtiram a avaliação
 *           items:
 *             type: string
 *         comments:
 *           type: array
 *           description: Lista de IDs de comentários associados à avaliação
 *           items:
 *             type: string
 *         content:
 *           type: string
 *           description: ID do conteúdo avaliado (referência ao modelo Content)
 *       example:
 *         title: "Minha Avaliação"
 *         body: "Esta é uma avaliação incrível!"
 *         classification: 5
 *         owner: "65b8f..."
 *         likes: ["65b8f...", "65b8f..."]
 *         comments: ["65b8f...", "65b8f..."]
 *         content: "65b8f..."
 * 
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /reviews/add:
 *   post:
 *     summary: Cria uma nova avaliação
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da avaliação
 *               body:
 *                 type: string
 *                 description: Corpo da avaliação (opcional)
 *               classification:
 *                 type: number
 *                 description: Classificação numérica da avaliação
 *               content:
 *                 type: string
 *                 description: ID do conteúdo avaliado
 *             example:
 *               title: "Minha Avaliação"
 *               body: "Esta é uma avaliação incrível!"
 *               classification: 5
 *               content: "65b8f..."
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       400:
 *         description: Erro ao criar a avaliação
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 */
router.post("/add", authMiddleware, createReview);

/**
 * @swagger
 * /reviews/get:
 *   get:
 *     summary: Obtém todas as avaliações
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Lista de avaliações encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: Nenhuma avaliação encontrada
 */
router.get("/get", getReviews);

/**
 * @swagger
 * /reviews/delete:
 *   delete:
 *     summary: Exclui uma avaliação
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewId:
 *                 type: string
 *                 description: ID da avaliação a ser excluída
 *             example:
 *               reviewId: "65b8f..."
 *     responses:
 *       200:
 *         description: Avaliação excluída com sucesso
 *       404:
 *         description: Avaliação não encontrada
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 */
router.delete("/delete", authMiddleware, deleteReview);

/**
 * @swagger
 * /reviews/edit:
 *   put:
 *     summary: Atualiza uma avaliação existente
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewId:
 *                 type: string
 *                 description: ID da avaliação a ser atualizada
 *               updates:
 *                 type: object
 *                 description: Campos a serem atualizados na avaliação
 *                 properties:
 *                   title:
 *                     type: string
 *                   body:
 *                     type: string
 *                   classification:
 *                     type: number
 *             example:
 *               reviewId: "65b8f..."
 *               updates:
 *                 title: "Avaliação Atualizada"
 *                 classification: 4
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *       404:
 *         description: Avaliação não encontrada
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 */
router.put("/edit", authMiddleware, editReview);

/**
 * @swagger
 * /reviews/like:
 *   put:
 *     summary: Adiciona/remover um like em uma avaliação
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reviewId:
 *                 type: string
 *                 description: ID da avaliação
 *               userId:
 *                 type: string
 *                 description: ID do usuário que está curtindo
 *             example:
 *               reviewId: "65b8f..."
 *               userId: "65b8f..."
 *     responses:
 *       200:
 *         description: Like adicionado/removido com sucesso
 *       404:
 *         description: Avaliação não encontrada
 *       401:
 *         description: Não autorizado (token inválido ou ausente)
 */
router.put("/like", authMiddleware, likeReview);

module.exports = router;