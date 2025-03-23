const express = require("express");
const { createMovie, getAllMovies, deleteMoviebyName, updateMoviebyName, findMovie } = require("../controllers/movieController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Operações relacionadas a filmes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do filme (único)
 *         genre:
 *           type: string
 *           description: Gênero do filme
 *         rating:
 *           type: string
 *           description: Classificação do filme
 *         cover:
 *           type: object
 *           properties:
 *             imageURL:
 *               type: string
 *               description: URL da imagem de capa
 *             title:
 *               type: string
 *               description: Título da capa
 *         year:
 *           type: string
 *           description: Ano de lançamento do filme
 *         avg:
 *           type: number
 *           description: Média de avaliações do filme
 *         synopsis:
 *           type: string
 *           description: Sinopse do filme
 *       example:
 *         name: "Interestelar"
 *         genre: "Ficção Científica"
 *         rating: "PG-13"
 *         cover:
 *           imageURL: "https://example.com/interstellar.jpg"
 *           title: "Capa do filme Interestelar"
 *         year: "2014"
 *         avg: 4.5
 *         synopsis: "Um grupo de exploradores viaja através de um buraco de minhoca em busca de um novo lar para a humanidade."
 */

/**
 * @swagger
 * /movies/add:
 *   post:
 *     summary: Cria um novo filme
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *       400:
 *         description: Erro ao criar o filme
 */
router.post("/add", createMovie);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Obtém todos os filmes
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Lista de filmes encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Nenhum filme encontrado
 */
router.get("/", getAllMovies);

/**
 * @swagger
 * /movies/delete:
 *   delete:
 *     summary: Exclui um filme pelo nome
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do filme a ser excluído
 *             example:
 *               name: "Interestelar"
 *     responses:
 *       200:
 *         description: Filme excluído com sucesso
 *       404:
 *         description: Filme não encontrado
 */
router.delete("/delete", deleteMoviebyName);

/**
 * @swagger
 * /movies/update:
 *   put:
 *     summary: Atualiza um filme pelo nome
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do filme a ser atualizado
 *               updates:
 *                 type: object
 *                 description: Campos a serem atualizados no filme
 *                 properties:
 *                   genre:
 *                     type: string
 *                   rating:
 *                     type: string
 *                   cover:
 *                     type: object
 *                     properties:
 *                       imageURL:
 *                         type: string
 *                       title:
 *                         type: string
 *                   year:
 *                     type: string
 *                   avg:
 *                     type: number
 *                   synopsis:
 *                     type: string
 *             example:
 *               name: "Interestelar"
 *               updates:
 *                 genre: "Drama"
 *                 avg: 4.7
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *       404:
 *         description: Filme não encontrado
 */
router.put("/update", updateMoviebyName);

/**
 * @swagger
 * /movies/get:
 *   get:
 *     summary: Busca um filme pelo nome
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do filme a ser buscado
 *     responses:
 *       200:
 *         description: Filme encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Filme não encontrado
 */
router.get("/get", findMovie);

module.exports = router;