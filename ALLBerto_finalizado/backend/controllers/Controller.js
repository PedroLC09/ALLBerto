const EstacionamentoModel = require('../models/Model');

const EstacionamentoController = {
    // 1. Criar Estacionamento (POST) - CORRIGIDO
    cadastrar: async (req, res) => {
        try {
            const { nome_estacionamento, endereco } = req.body;
            
            if (!nome_estacionamento) {
                return res.status(400).json({ error: 'Campo obrigatório ausente.' });
            }

            // Enviando ambos os parâmetros na ordem que o Model espera
            const novoEstacionamento = await EstacionamentoModel.criar(nome_estacionamento, endereco);
            
            // Retorna o status 201 e o objeto estruturado com o id que o MySQL gerou (insertId)
            res.status(201).json({ 
                message: 'Estacionamento cadastrado com sucesso!', 
                estacionamento: {
                    id: novoEstacionamento ? novoEstacionamento.insertId : null,
                    nome_estacionamento,
                    endereco
                } 
            });
        } catch(error) {
            res.status(500).json({ error: 'Erro ao cadastrar estacionamento: ' + error.message });
        }
    },

    // 2. Listar todos os Estacionamentos (GET)
    listar: async (req, res) => {
        try {
            const lista = await EstacionamentoModel.listarTodos();
            res.status(200).json(lista);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar estacionamentos: ' + error.message });
        }
    },

    // 3. Buscar um único estacionamento por ID (GET específico) - CORRIGIDO (res.status)
    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params;
            const estacionamento = await EstacionamentoModel.buscarPorId(id);
            if (!estacionamento) {
                return res.status(404).json({ error: 'Estacionamento não encontrado.'});
            }
            res.status(200).json(estacionamento); // Corrigido de req para res
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar detalhes: ' + error.message });
        }
    },

    // 4. Editar Estacionamento (PUT) - CORRIGIDO (Ordem dos parâmetros)
    editar: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome_estacionamento, endereco } = req.body;
            
            // Corrigida a ordem passada para o Model para bater com: atualizar(nome_estacionamento, id)
            const atualizado = await EstacionamentoModel.atualizar(nome_estacionamento, endereco, id);
            
            if(!atualizado) {
                return res.status(404).json({ error: 'Estacionamento não encontrado para atualizar.' });
            }
            res.status(200).json({ message: 'Estacionamento atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar: ' + error.message });
        }
    },

    // 5. Deletar Estacionamento (DELETE)
    deletar: async (req, res) => {
        try {
            const { id } = req.params;
            const excluido = await EstacionamentoModel.excluir(id);
            if(!excluido) {
                return res.status(404).json({ error: 'Estacionamento não encontrado para exclusão.' });
            }
            res.status(200).json({ message: 'Estacionamento excluído com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao excluir ' + error.message });
        }
    },

    // Adicione estas duas funções dentro do seu Controller.js
cadastrarUsuario: async (req, res) => {
    const { nome, email, senha, tipo } = req.body;
    try {
        // Verifica se o email já existe
        const usuarioExiste = await EstacionamentoModel.buscarUsuarioPorEmail(email);
        if (usuarioExiste) {
            return res.status(400).json({ error: "Este e-mail já está cadastrado." });
        }

        // Importante: Em produção usaríamos bcrypt para criptografar, 
        // mas no Hackathon faremos direto para ganhar tempo de entrega!
        await EstacionamentoModel.cadastrarUsuario({ nome, email, senha, tipo });
        res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno ao cadastrar usuário." });
    }
},

    loginUsuario: async (req, res) => {
        const { email, senha } = req.body;
        try {
            const usuario = await EstacionamentoModel.buscarUsuarioPorEmail(email);
            if (!usuario) {
                return res.status(400).json({ error: "E-mail ou senha incorretos." });
            }

            // Validação simples de senha textual
            if (usuario.senha !== senha) {
                return res.status(400).json({ error: "E-mail ou senha incorretos." });
            }

            // Retorna os dados do usuário para o frontend armazenar
            res.json({
                message: "Login bem-sucedido!",
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    tipo: usuario.tipo
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro interno ao realizar login." });
        }
    }
};

module.exports = EstacionamentoController;