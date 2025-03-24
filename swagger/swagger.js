
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


// Configuração do Swagger-JSDoc
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Opinai API',
            version: '1.0.0',
            description:  'API dedicada à criação, gerenciamento e consulta de reviews sobre filmes e séries. A Opinai API permite que os usuários compartilhem suas opiniões, classifiquem conteúdos audiovisuais e acessem avaliações de outros usuários. Com funcionalidades como pesquisa detalhada, filtragem por gênero, diretor ou plataforma de streaming, e suporte a comentários e interações, esta API é ideal para desenvolvedores que desejam criar plataformas de recomendação personalizadas ou comunidades de cinéfilos. Explore avaliações detalhadas, descubra novos títulos e conecte-se com outros apaixonados por cinema e séries!',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: 'Servidor local'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./routes/*.js'], // Caminho para os arquivos que contêm os comentários JSDoc
};

const swaggerSpec = swaggerJSDoc(options);

// Middleware para servir a documentação Swagger
module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};