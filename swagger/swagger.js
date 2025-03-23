
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


// Configuração do Swagger-JSDoc
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Notes API',
            version: '1.0.0',
            description: 'API para gerenciamento de notas de usuários',
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