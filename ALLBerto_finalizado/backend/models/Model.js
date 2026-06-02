const pool = require('../config/db');

const EstacionamentoModel = {
    // 1. CADASTRAR (POST)
    criar: async (nome_estacionamento, endereco) => {
        const sql = `INSERT INTO estacionamentos (nome_estacionamento, endereco) VALUES (?, ?)`;
        const [result] = await pool.execute(sql, [nome_estacionamento, endereco]);
        return result;
    },

    // 2. LISTAR TODOS (GET)
    listarTodos: async () => {
        const [rows] = await pool.execute('SELECT * FROM estacionamentos');
        return rows;
    },

    // 3. BUSCAR POR ID (GET específico)
    buscarPorId: async (id) => {
        const [rows] = await pool.execute('SELECT * FROM estacionamentos WHERE id = ?', [id]);
        return rows[0];
    },

    // 4. EDITAR (PUT)
    atualizar: async (nome_estacionamento, endereco, id) => {
        const sql = `UPDATE estacionamentos SET nome_estacionamento = ?, endereco = ? WHERE id = ?`;
        const [result] = await pool.execute(sql, [nome_estacionamento, endereco, id]);
        return result.affectedRows > 0;
    },

    // 5. EXCLUIR (DELETE)
    excluir: async (id) => {
        const [result] = await pool.execute('DELETE FROM estacionamentos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    },

   cadastrarUsuario: async (dados) => {
    const { nome, email, senha, tipo } = dados; // Extrai do objeto vindo do Controller
    const sql = "INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)";
    const valores = [nome, email, senha, tipo];
    
    const [result] = await pool.execute(sql, valores);
    return result.insertId;
    },
    
    buscarUsuarioPorEmail: async (email) => {
        const sql = "SELECT * FROM usuarios WHERE email = ?";
        const [rows] = await pool.execute(sql, [email]);
        return rows[0]; // Retorna o usuário encontrado ou undefined
    }
};

module.exports = EstacionamentoModel;