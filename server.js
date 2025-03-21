const { connectDB, disconnectDB } = require('./database/db');
const app = require('./app');
const PORT = process.env.PORT;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Erro ao iniciar o servidor:', err);
    });
// Desconectar o banco ao encerrar o servidor
process.on('SIGINT', async () => {
    await disconnectDB();
    process.exit(0);
});
