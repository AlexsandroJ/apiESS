const express = require("express");
const { createNote, findNote, updateNote, getNotes, deleteNote } = require("../controllers/noteController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Operações relacionadas a notas dos usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID do usuário associado às notas (referência ao modelo User)
 *         notes:
 *           type: array
 *           description: Lista de notas do usuário
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título da nota
 *               note:
 *                 type: string
 *                 description: Conteúdo da nota
 *       example:
 *         id: "65b8f..."
 *         notes:
 *           - title: "Minha Primeira Nota"
 *             note: "Este é o conteúdo da minha primeira nota."
 *           - title: "Minha Segunda Nota"
 *             note: "Este é o conteúdo da minha segunda nota."
 */

/**
 * @swagger
 * /notes/add:
 *   post:
 *     summary: Cria uma nova nota para um usuário
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do usuário
 *               title:
 *                 type: string
 *                 description: Título da nota
 *               note:
 *                 type: string
 *                 description: Conteúdo da nota
 *             example:
 *               id: "65b8f..."
 *               title: "Minha Nova Nota"
 *               note: "Este é o conteúdo da minha nova nota."
 *     responses:
 *       201:
 *         description: Nota criada com sucesso
 *       400:
 *         description: Erro ao criar a nota
 */
router.post("/add", createNote);

/**
 * @swagger
 * /notes/find:
 *   get:
 *     summary: Busca notas com base em um filtro
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Título da nota (opcional)
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID do usuário associado à nota (opcional)
 *     responses:
 *       200:
 *         description: Lista de notas encontradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       404:
 *         description: Nenhuma nota encontrada
 */
router.get("/find/", findNote);

/**
 * @swagger
 * /notes/edit:
 *   put:
 *     summary: Atualiza uma nota existente
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do usuário
 *               title:
 *                 type: string
 *                 description: Título da nota a ser atualizada
 *               note:
 *                 type: string
 *                 description: Novo conteúdo da nota
 *             example:
 *               id: "65b8f..."
 *               title: "Minha Nota Atualizada"
 *               note: "Este é o novo conteúdo da minha nota."
 *     responses:
 *       200:
 *         description: Nota atualizada com sucesso
 *       404:
 *         description: Nota não encontrada
 */
router.put("/edit", updateNote);

/**
 * @swagger
 * /notes/{email}:
 *   get:
 *     summary: Obtém todas as notas de um usuário pelo email
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: Email do usuário
 *     responses:
 *       200:
 *         description: Lista de notas do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       404:
 *         description: Nenhuma nota encontrada para o usuário
 */
router.get("/:email", getNotes);

/**
 * @swagger
 * /notes/dell:
 *   delete:
 *     summary: Exclui uma nota
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do usuário
 *               title:
 *                 type: string
 *                 description: Título da nota a ser excluída
 *             example:
 *               id: "65b8f..."
 *               title: "Minha Nota a Ser Excluída"
 *     responses:
 *       200:
 *         description: Nota excluída com sucesso
 *       404:
 *         description: Nota não encontrada
 */
router.delete("/dell", deleteNote);

module.exports = router;