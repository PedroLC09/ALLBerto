const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });
}

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
}

// --- DAQUI PARA BAIXO SÃO AS FUNÇÕES QUE ADICIONEI PARA VOCÊ ---

const API_URL = "http://localhost:3007/api/usuarios/cadastro";

async function cadastrarNoBack(dados) {
    try {
        const response = await fetch("http://localhost:3007/api/usuarios/cadastro", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();

        if (response.ok) {
            
            // LÓGICA DE REDIRECIONAMENTO
            if (dados.tipo === "vendedor") {
                window.location.href = "Vendedor.html";
                
            } else {
                window.location.href = "../Thomas_Telas/TelasCliente/telas/mapa.html";
            }

        } else {
            alert("Erro no cadastro: " + resultado.error);
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("O servidor está desligado!");
    }
}

document.getElementById("formParceiro")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = {
        nome: document.getElementById("nomeParceiro").value,
        email: document.getElementById("emailParceiro").value,
        senha: document.getElementById("senhaParceiro").value,
        tipo: "vendedor" 
    };
    cadastrarNoBack(dados);
});

document.getElementById("formNavegante")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = {
        nome: document.getElementById("nomeNavegante").value,
        email: document.getElementById("emailNavegante").value,
        senha: document.getElementById("senhaNavegante").value,
        tipo: "cliente"
    };
    cadastrarNoBack(dados);
});