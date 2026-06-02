const API_URL = "http://localhost:3007/api/estacionamentos";

// Captura o ID do estacionamento enviado pela URL (se houver)
const urlParams = new URLSearchParams(window.location.search);
const estacionamentoId = urlParams.get('id');

// Seleção dos elementos do formulário principal
const nomeInput = document.getElementById("nomeInput");
const enderecoInput = document.getElementById("enderecoInput");
const btnSalvar = document.querySelector(".save");

// Seleção dos elementos de Vagas e Preços
const vagasMotos = document.getElementById("vagasMotos");
const precoHoraMotos = document.getElementById("precoHoraMotos");
const precoDiariaMotos = document.getElementById("precoDiariaMotos");

const vagasCarros = document.getElementById("vagasCarros");
const precoHoraCarros = document.getElementById("precoHoraCarros");
const precoDiariaCarros = document.getElementById("precoDiariaCarros");

const vagasCaminhoes = document.getElementById("vagasCaminhoes");
const precoHoraCaminhoes = document.getElementById("precoHoraCaminhoes");
const precoDiariaCaminhoes = document.getElementById("precoDiariaCaminhoes");

// --- 1. CARREGAR OS DADOS DO BANCO (APENAS SE FOR MODO EDIÇÃO) ---
async function carregarDadosEstacionamento() {
    // Se NÃO tem ID válido na URL, é um CADASTRO NOVO. Não exibe alertas e deixa os campos livres!
    if (!estacionamentoId || estacionamentoId === "null" || estacionamentoId === "undefined") {
        console.log("Modo: Criando um novo estacionamento de raiz.");
        return; 
    }

    // Se TEM ID, busca as informações atuais no banco para preencher a tela
    try {
        const response = await fetch(`${API_URL}/${estacionamentoId}`);
        if (!response.ok) throw new Error("Erro ao buscar dados do estacionamento.");
        
        const est = await response.json();
        
        // Alimenta o formulário com os dados salvos no Banco de Dados
        nomeInput.value = est.nome_estacionamento || "";
        enderecoInput.value = est.endereco || "";
        
        // Alimenta as vagas e valores salvos (se o seu banco/controller já retornar esses nomes)
        if(vagasMotos) vagasMotos.value = est.motos || "";
        if(vagasCarros) vagasCarros.value = est.carros || "";
        if(vagasCaminhoes) vagasCaminhoes.value = est.caminhoes || "";
        
    } catch (error) {
        console.error("Erro ao carregar dados para edição:", error);
        alert("Não foi possível carregar as informações deste estacionamento.");
    }
}

// --- 2. GERAÇÃO VISUAL DAS VAGAS (BOLINHAS VERDES/VERMELHAS) ---
function criarVagas(classe, quantidade) {
    const container = document.querySelector(classe);
    if (!container) return;
    
    container.innerHTML = ""; 

    for (let i = 0; i < quantidade; i++) {
        const vaga = document.createElement("div");
        vaga.classList.add("vaga");

        vaga.addEventListener("click", () => {
            vaga.style.background =
                vaga.style.background === "rgb(239, 68, 68)"
                    ? "#22c55e"
                    : "#ef4444";
        });

        container.appendChild(vaga);
    }
}

// --- 3. ENVIO DOS DADOS (POST PARA CRIAR / PUT PARA ATUALIZAR) ---
btnSalvar.addEventListener("click", async () => {
    const nomeFormatado = nomeInput.value.trim().toUpperCase();
    const enderecoFormatado = enderecoInput.value.trim();

    if (!nomeFormatado) {
        return alert("O nome do estacionamento é obrigatório!");
    }

    // Montamos o JSON tratando campos vazios como 0 ou null para evitar o erro de 'undefined' no banco
    const dadosFormulario = {
        nome_estacionamento: nomeFormatado,
        endereco: enderecoFormatado,
        motos: parseInt(vagasMotos.value) || 0,
        carros: parseInt(vagasCarros.value) || 0,
        caminhoes: parseInt(vagasCaminhoes.value) || 0
        // Se o seu banco tiver campos de preço, você pode mapeá-los aqui também:
        // preco_hora_motos: parseFloat(precoHoraMotos.value) || 0.0
    };

    // Define dinamicamente o método e a rota baseados na presença do ID
    const ehEdicao = estacionamentoId && estacionamentoId !== "null" && estacionamentoId !== "undefined";
    const urlFinal = ehEdicao ? `${API_URL}/${estacionamentoId}` : API_URL;
    const metodoHTTP = ehEdicao ? 'PUT' : 'POST';

    try {
        btnSalvar.textContent = "Salvando no Banco...";
        btnSalvar.disabled = true;

        const response = await fetch(urlFinal, {
            method: metodoHTTP,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosFormulario)
        });

        if (response.ok) {
            // Retorna para a listagem principal (Tela 1)
            window.location.href = "../Matheus_Telas/Vendedor.html";
        } else {
            const erro = await response.json();
            alert(`Erro do Servidor: ${erro.error || 'Falha ao salvar.'}`);
        }
    } catch (error) {
        console.error("Erro na comunicação com a API:", error);
        alert("Não foi possível estabelecer contato com o servidor backend.");
    } finally {
        btnSalvar.textContent = "Salvar Estacionamento";
        btnSalvar.disabled = false;
    }
});

// --- 4. CONFIGURAÇÕES ADICIONAIS DA TELA ---
// Gerenciador de clique dos botões de dias da semana
document.querySelectorAll(".dia").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
    });
});

// Manipulador de upload de imagens
document.querySelectorAll(".upload input").forEach(input => {
    input.addEventListener("change", e => {
        const file = e.target.files[0];
        if (!file) return;

        const img = input.parentElement.querySelector("img");
        img.src = URL.createObjectURL(file);
        img.style.display = "block";

        input.parentElement.querySelector("span").style.display = "none";
    });
});

// --- EXECUÇÃO INICIAL ---
// Renderiza as 42 bolinhas verdes de simulação visual das vagas
criarVagas(".motos", 42);
criarVagas(".carros", 42);
criarVagas(".caminhoes", 42);

// Dispara a leitura inteligente da URL
carregarDadosEstacionamento();


// --- LÓGICA DO ABAJUR (MODO CLARO/ESCURO) ---
document.addEventListener("DOMContentLoaded", () => {
    const lampIcon = document.getElementById("lampIcon");
    const body = document.body;

    // Carrega a preferência que foi clicada na outra tela
    if (localStorage.getItem("temaDesejado") === "dark") {
        body.classList.add("dark-mode");
    }

    // Liga e desliga ao clicar no abajur
    if (lampIcon) {
        lampIcon.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("temaDesejado", "dark");
            } else {
                localStorage.setItem("temaDesejado", "light");
            }
        });
    }
});