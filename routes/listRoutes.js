const express = require('express');
const router = express.Router();
const ListController = require('../controllers/ListController');

/**
 * @swagger
 * tags:
 *   name: Lists
 *   description: Operações relacionadas às listas (watched e abandoned)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do membro
 *         gender:
 *           type: string
 *           description: Gênero do membro
 *         description:
 *           type: string
 *           description: Descrição do membro
 *         userAvaliation:
 *           type: number
 *           description: Avaliação do usuário para o membro
 *       example:
 *         name: "João"
 *         gender: "Masculino"
 *         description: "Um ótimo personagem!"
 *         userAvaliation: 5
 * 
 *     List:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome da lista
 *         type:
 *           type: string
 *           description: Tipo da lista (watched ou abandoned)
 *         members:
 *           type: array
 *           description: Lista de membros
 *           items:
 *             $ref: '#/components/schemas/Member'
 *       example:
 *         name: "Minha Lista Assistida"
 *         type: "watched"
 *         members:
 *           - name: "João"
 *             gender: "Masculino"
 *             description: "Um ótimo personagem!"
 *             userAvaliation: 5
 */

/**
 * @swagger
 * /lists/{type}:
 *   post:
 *     summary: Cria uma nova lista (watched ou abandoned)
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [watched, abandoned]
 *         description: Tipo da lista (watched ou abandoned)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da lista
 *             example:
 *               name: "Minha Lista Assistida"
 *     responses:
 *       201:
 *         description: Lista criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/List'
 *       400:
 *         description: Erro ao criar a lista
 */
router.post('/lists/:type', ListController.createList);

/**
 * @swagger
 * /lists/{type}:
 *   get:
 *     summary: Obtém uma lista pelo tipo (watched ou abandoned)
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [watched, abandoned]
 *         description: Tipo da lista (watched ou abandoned)
 *     responses:
 *       200:
 *         description: Lista encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/List'
 *       404:
 *         description: Lista não encontrada
 */
router.get('/lists/:type', ListController.getList);

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Obtém todas as listas do usuário
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: Listas encontradas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/List'
 *       404:
 *         description: Nenhuma lista encontrada
 */
router.get('/lists', ListController.getAllLists);

/**
 * @swagger
 * /lists/{type}/members/{memberName}:
 *   get:
 *     summary: Obtém um membro de uma lista pelo nome
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [watched, abandoned]
 *         description: Tipo da lista (watched ou abandoned)
 *       - in: path
 *         name: memberName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do membro
 *     responses:
 *       200:
 *         description: Membro encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Membro não encontrado
 */
router.get('/lists/:type/members/:memberName', ListController.getMember);

/**
 * @swagger
 * /lists/{type}/members:
 *   post:
 *     summary: Adiciona um membro à lista (watched ou abandoned)
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [watched, abandoned]
 *         description: Tipo da lista (watched ou abandoned)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Membro adicionado com sucesso
 *       400:
 *         description: Erro ao adicionar o membro
 */
router.post('/lists/:type/members', ListController.addMember);

/**
 * @swagger
 * /lists/{type}/members/{memberName}:
 *   delete:
 *     summary: Remove um membro da lista (watched ou abandoned)
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [watched, abandoned]
 *         description: Tipo da lista (watched ou abandoned)
 *       - in: path
 *         name: memberName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do membro
 *     responses:
 *       200:
 *         description: Membro removido com sucesso
 *       404:
 *         description: Membro não encontrado
 */
router.delete('/lists/:type/members/:memberName', ListController.removeMember);

/**
 * @swagger
 * /lists/{type}/members/{memberName}:
 *   put:
 *     summary: Atualiza um membro da lista (watched ou abandoned)
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [watched, abandoned]
 *         description: Tipo da lista (watched ou abandoned)
 *       - in: path
 *         name: memberName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do membro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       200:
 *         description: Membro atualizado com sucesso
 *       404:
 *         description: Membro não encontrado
 */
router.put('/lists/:type/members/:memberName', ListController.updateListMember);

/**
 * @swagger
 * /lists/{type}:
 *   delete:
 *     summary: Deleta uma lista (watched ou abandoned)
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [watched, abandoned]
 *         description: Tipo da lista (watched ou abandoned)
 *     responses:
 *       200:
 *         description: Lista deletada com sucesso
 *       404:
 *         description: Lista não encontrada
 */
router.delete('/lists/:type', ListController.deleteList);

module.exports = router;