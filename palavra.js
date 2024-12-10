// Array de palavras em português
const palavras = [
    "cachorro", "gato", "elefante", "arco-íris", "abacaxi", "banana", "computador", "sol", "lua", "terra",
    "floresta", "amigo", "jogo", "vitoria", "desafio", "coragem", "estrela", "relógio", "livro", "solitário",
    "melancia", "girafa", "golfinho", "praia", "tigre", "foca", "pato", "hipopotamo", "leão", "zebra",
    "elefante", "carro", "bicicleta", "avião", "navio", "navalha", "cavalo", "cachoeira", "morcego", "golfe",
    "flor", "luz", "célula", "montanha", "nuvem", "lagoa", "oceano", "galáxia", "planeta", "estrela",
    "sereia", "futebol", "volei", "basquete", "xadrez"
];


// Variáveis de controle do jogo
let palavraEscolhida;
let palavraAtual;
let tentativas = 0;
let palavraFinalizada = false;
let letrasErradas = []; // Array para armazenar letras erradas
let letrasDescobertas = []; // Array para armazenar letras descobertas

// Função para sortear uma palavra aleatória do array
function sortearPalavra() {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length); // Sorteia um índice aleatório
    palavraEscolhida = palavras[indiceAleatorio].toLowerCase();  // Palavra escolhida (minúscula)
    palavraAtual = "_".repeat(palavraEscolhida.length).split("");  // Palavras ocultas com "_"
    
    // Atualiza a interface com a palavra oculta
    document.getElementById("palavra").textContent = palavraAtual.join(" ");
    tentativas = 0;
    document.getElementById("tentativasFeitas").querySelector("span").textContent = tentativas;
    palavraFinalizada = false;
    letrasErradas = [];
    letrasDescobertas = [];
    document.getElementById("letrasErradas").textContent = "";
    document.getElementById("letrasDescobertas").textContent = "";
    document.getElementById("mensagem").textContent = "";
    document.getElementById("mensagem").classList.remove("win");
}

// Função para verificar a tentativa do jogador com uma letra
function verificarLetra() {
    if (palavraFinalizada) return;

    const letra = document.getElementById("letra").value.toLowerCase();

    // Verifica se a letra é válida e não foi tentada antes
    if (letra.length === 1 && /^[a-z]$/.test(letra)) {
        // Se a letra já estiver nas letras erradas ou já foi tentada, não conta como nova tentativa
        if (letrasErradas.includes(letra) || palavraAtual.includes(letra)) {
            return;  // Ignora a letra se já foi errada ou já descoberta
        }

        tentativas++;
        document.getElementById("tentativasFeitas").querySelector("span").textContent = tentativas;

        let letraCorreta = false;
        for (let i = 0; i < palavraEscolhida.length; i++) {
            if (palavraEscolhida[i] === letra && palavraAtual[i] === "_") {
                palavraAtual[i] = letra;
                letraCorreta = true;
                if (!letrasDescobertas.includes(letra)) {
                    letrasDescobertas.push(letra);
                }
            }
        }

        document.getElementById("palavra").textContent = palavraAtual.join(" ");

        if (!letraCorreta && !letrasErradas.includes(letra)) {
            letrasErradas.push(letra);  // Adiciona a letra errada, mas só se não estiver repetida
        }

        document.getElementById("letrasErradas").textContent = letrasErradas.join(", ");
        document.getElementById("letrasDescobertas").textContent = letrasDescobertas.join(", ");

        // Verifica se o jogador acertou a palavra
        if (!palavraAtual.includes("_")) {
            palavraFinalizada = true;
            document.getElementById("mensagem").textContent = `Você venceu! Tentativas: ${tentativas}`;
            document.getElementById("mensagem").classList.add("win");
            
            // Exibe as palavras descobertas após o usuário acertar
            document.getElementById("palavrasDescobertas").textContent = palavraEscolhida;

            // Chama a função para exibir os confetes
            mostrarConfetes();

            // Habilita o botão de reiniciar o jogo
            document.getElementById("reiniciarJogo").style.display = "block"; 
        }

    } else {
        alert("Por favor, digite uma letra válida.");
    }

    document.getElementById("letra").value = "";  // Limpa o campo de entrada de letra
    document.getElementById("letra").focus();  // Coloca o foco novamente no campo de entrada de letra
}

// Função para verificar a palavra completa digitada pelo jogador
function verificarPalavraCompleta() {
    if (palavraFinalizada) return;

    const palavraDigitada = document.getElementById("palavraCompleta").value.toLowerCase();

    if (palavraDigitada === palavraEscolhida) {
        palavraFinalizada = true;
        document.getElementById("mensagem").textContent = `Você venceu! Tentativas: ${tentativas}`;
        document.getElementById("mensagem").classList.add("win");

        // Exibe as palavras descobertas após o usuário acertar
        document.getElementById("palavrasDescobertas").textContent = palavraEscolhida;

        // Chama a função para exibir os confetes
        mostrarConfetes();

        // Habilita o botão de reiniciar o jogo
        document.getElementById("reiniciarJogo").style.display = "block"; 
    } else {
        alert("A palavra digitada está incorreta!");
    }

    document.getElementById("palavraCompleta").value = "";
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    sortearPalavra();
    document.getElementById("mensagem").textContent = "";
    document.getElementById("mensagem").classList.remove("win");
    document.getElementById("reiniciarJogo").style.display = "none";  // Esconde o botão de reiniciar
}

// Função para mostrar confetes na tela
function mostrarConfetes() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.5, y: 0.5 }, // Confetes no meio da tela
        colors: ['#ff4081', '#00bcd4', '#ff80ab', '#ff5722']
    });
}

// Inicia o jogo ao carregar a página
window.onload = sortearPalavra;

// Ouvinte de eventos para capturar o "Enter" e submeter a tentativa de letra
document.getElementById("letra").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        verificarLetra();
    }
});

// Ouvinte de eventos para capturar o "Enter" e submeter a tentativa de palavra
document.getElementById("palavraCompleta").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        verificarPalavraCompleta();
    }
});
