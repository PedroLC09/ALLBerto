require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const rotasEstacionamento = require('./routes/Routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', rotasEstacionamento);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
   console.log(`🚀 Servidor ALLBerto rodando na porta ${PORT}`);
});