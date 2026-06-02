// URL base da sua API configurada no backend
const API_URL = "http://localhost:3007/api/estacionamentos";
const container = document.getElementById("parkingContainer");

// --- 1. FUNÇÃO PARA RENDERIZAR O CARD NA TELA (READ/UPDATE/DELETE VISUAL) ---
function renderizarCard(est) {
    const card = document.createElement("div");
    card.classList.add("parking-card");
    // Atribuímos o ID do banco ao elemento HTML para facilitar a busca depois
    card.dataset.id = est.id; 

    // Valores padrão para os campos que não estão no banco de dados
    const imagemPadrao = "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200";
    const vagasMotos = est.motos || 10;
    const vagasCarros = est.carros || 10;
    const vagasCaminhoes = est.caminhoes || 0;
    const bairroExibicao = est.bairro ? ` - ${est.bairro}` : "";

    card.innerHTML = `
        <div class="parking-title">
            <span class="nome-txt">${est.nome_estacionamento}</span><small style="font-size: 14px; color: #a0aec0;">${bairroExibicao}</small>
        </div>

        <div class="parking-content">
            <img src="${imagemPadrao}" class="parking-image">

            <div class="parking-info">
                <div class="schedule">
                    Seg. Ter. Qua. Qui. Sex. Sab. Dom.<br>
                    09:30 até 21:30
                </div>

                <div class="info-item">
                    <span>🏍️ Vagas para motos: ${vagasMotos}</span>
                    <span class="price">R$18,00/hora</span>
                </div>

                <div class="info-item">
                    <span>🚗 Vagas para carros: ${vagasCarros}</span>
                    <span class="price">R$20,00/hora</span>
                </div>

                <div class="info-item">
                    <span>🚚 Vagas para caminhões: ${vagasCaminhoes}</span>
                    <span class="price">R$35,00/hora</span>
                </div>

                <div class="edit">
                    <button class="edit-btn" title="Editar">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="delete-btn" title="Excluir" style="margin-left: 8px;">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    // --- AÇÃO DO BOTÃO DE EXCLUIR (DELETE) ---
    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", async () => {
        const idEstacionamento = est.id || card.dataset.id;

        if (!idEstacionamento || idEstacionamento === "null" || idEstacionamento === "undefined") {
            return alert("Erro: ID inválido. Recarregue a página.");
        }

        try {
            const response = await fetch(`${API_URL}/${idEstacionamento}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                card.remove(); // Remove da tela apenas se deletou no banco
            } else {
                const erro = await response.json();
            }
        } catch (error) {
            console.error("Erro na requisição DELETE:", error);
        }
    });

    // --- AÇÃO DO BOTÃO DE EDITAR (REDIRECIONAR PARA TELA 2 COM ID) ---
    const editBtn = card.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        const idEstacionamento = est.id || card.dataset.id;

        if (!idEstacionamento || idEstacionamento === "null" || idEstacionamento === "undefined") {
            return alert("Erro: ID inválido para edição.");
        }
        // Sabe da pasta 'tela 1' (onde está o Vendedor.js) e entra na pasta 'tela 2'
        window.location.href = "../Matheus_Telas/edit.html?id=" + idEstacionamento;
    });

    container.appendChild(card);
}

// --- 2. CARREGAR DADOS DO BANCO AO INICIAR A PÁGINA (READ - GET) ---
async function carregarEstacionamentos() {
    try {
        container.innerHTML = "<p style='color: white;'>Carregando estacionamentos...</p>";
        const response = await fetch(API_URL);
        
        if (!response.ok) throw new Error("Erro ao buscar dados do servidor.");
        
        const dados = await response.json();
        container.innerHTML = ""; // Limpa a mensagem de carregando

        if (dados.length === 0) {
            container.innerHTML = "<p style='color: white;'>Nenhum estacionamento cadastrado ainda.</p>";
            return;
        }

        // Renderiza cada estacionamento vindo da API
        dados.forEach(renderizarCard);
    } catch (error) {
        console.error("Erro ao carregar:", error);
        container.innerHTML = "<p style='color: #ff6b6b;'>Erro ao conectar com o servidor backend.</p>";
    }
}

// Executa a busca assim que o arquivo JS é lido
carregarEstacionamentos();

// --- 3. LÓGICA DO BOTÃO ADICIONAR "+" DA TOPBAR (REDIRECIONAR PARA TELA 2 SEM ID) ---
const addParkingBtn = document.getElementById("addParkingBtn");
addParkingBtn.addEventListener("click", () => {
    window.location.href = "../Matheus_Telas/edit.html";
});

// --- 4. CONFIGURAÇÕES COMPLEMENTARES AO CARREGAR A PÁGINA (NOME DO USUÁRIO E TEMA) ---
document.addEventListener("DOMContentLoaded", () => {
    // Atualizar nome do usuário dinamicamente
    const nomeGuardado = localStorage.getItem("usuarioLogadoNome");
    const elementoNome = document.getElementById("userName");
    
    if (nomeGuardado && elementoNome) {
        elementoNome.textContent = nomeGuardado;
    }

    // Gerenciador do Modo Claro / Escuro (Abajur)
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const body = document.body;

    // Recupera a preferência anterior do usuário para não resetar no F5
    const temaSalvo = localStorage.getItem("temaDesejado");
    if (temaSalvo === "dark") {
        body.classList.add("dark-mode");
    }

    // Evento de click para ligar/desligar o abajur
    themeToggleBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("temaDesejado", "dark");
        } else {
            localStorage.setItem("temaDesejado", "light");
        }
    });
});