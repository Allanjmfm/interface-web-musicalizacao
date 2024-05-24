// Local Storage para o dark mode.
// Verifica se a chave 'dark-mode' não existe no armazenamento local
if (localStorage.getItem("dark-mode") === null) {
    // Se a chave 'dark-mode' não existe, define o valor 'false' (modo claro) para ela
    localStorage.setItem("dark-mode", false);
}

if (localStorage.getItem("erros") === null) {
    let erros = JSON.stringify([{
            "erro": 0,
            "erroAnterior": 0,
            "etapa": false, 
        },
        {
            "erro": 0,
            "erroAnterior": 0,
            "etapa": false, 
        },
        {
            "erro": 0,
            "erroAnterior": 0,
            "etapa": false, 
        },
        {
            "erro": 0,
            "erroAnterior": 0,
            "etapa": false, 
        },
        {
            "erro": 0,
            "erroAnterior": 0,
            "etapa": false, 
        },
        {
            "erro": 0,
            "erroAnterior": 0,
            "etapa": false, 
        },
        {
            "erro": 0,
            "erroAnterior": 0,
            "etapa": false, 
        },
        {
            "erro": 0,
            "erroAnterior": 0,
            "etapa": false, 
        },
        {
            "erro": 0,
            "erroAnterior": 0,
            "etapa": false, 
        },
        {
            "erro": 0,
            "erroAnterior": 0,
            "etapa": false, 
        }
    ]);
    localStorage.setItem("erros", erros);
}

// Definição de uma função assíncrona chamada toggleDarkMode
function toggleDarkMode() {
    // Obtém o valor do armazenamento local associado à chave 'dark-mode'
    let isDark = localStorage.getItem("dark-mode");

    // Verifica se o valor do 'dark-mode' é verdadeiro (true)
    if (JSON.parse(isDark)) {
        // Define o valor 'false' (falso) para a chave 'dark-mode' no armazenamento local
        localStorage.setItem("dark-mode", false);

        // Chama a função assíncrona 'removeDarkMode' para remover o modo escuro
        removeDarkMode();
    } else {
        // Define o valor 'true' (verdadeiro) para a chave 'dark-mode' no armazenamento local
        localStorage.setItem("dark-mode", true);

        // Chama a função assíncrona 'addDarkMode' para adicionar o modo escuro
        addDarkMode();
    }
}

// Configura um intervalo para verificar o estado de prontidão do documento e as condições de armazenamento local
let stateCheck = setInterval(async() => {
    // Verifica se o documento está totalmente carregado
    if (document.readyState === "complete") {
        // Verifica se um item específico existe no armazenamento local
        if (localStorage.getItem("conteudoAtual") !== null) {
            // Recupera o valor associado à chave 'conteudoAtual' do armazenamento local
            let conteudoLink = localStorage.getItem("conteudoAtual");

            // Chama uma função 'trocaConteudo' com os valores recuperados e uma função de retorno
            await trocaConteudo(conteudoLink, idConteudoEtapas, () => {
                // Uma vez que a ação seja executada, limpa o intervalo para parar de verificar
                // clearInterval(stateCheck);
            });
        }

        if (localStorage.getItem("zoom") !== null) {
            const zoomLocal = localStorage.getItem("zoom");
            document.body.style.zoom = zoomLocal.toString() + "%";
            if (zoomLevel === 100) {
                zoomLevel = parseInt(zoomLocal);
            }
        }

        /**
         * Verifica se o progresso do usuário existe no localStorage e atualiza a barra de progresso de acordo.
         *
         * @returns {void}
         */
        if (localStorage.getItem("userProgress") !== null) {
            const userProgress = localStorage.getItem("userProgress");
            const pageIndex = localStorage.getItem("pageIndex");

            updateProgressBar(pageIndex, userProgress);
        }
        // Verifica se a pontuação atual existe no local Storage, se não adiciona 10
        if (localStorage.getItem("pontos-atual") === null) {
            localStorage.setItem("pontos-atual", 10);
            AtualizaScore();
        } else {
            AtualizaScore()
        };

        if (localStorage.getItem("status-score") === null) {
            localStorage.setItem("status-score", 0);
        }
        if (localStorage.getItem("pontos-atual") !== null) {
            const pontosAtuais = localStorage.getItem("pontos-atual");
        }
        clearInterval(stateCheck);
    }
    // O documento ainda não está totalmente pronto, continue verificando
}, 10);

// Para guardar a página que o usuário ficou.
// Definição de uma função chamada paginaAtual
function paginaAtual() {
    // Obtém a URL atual da janela do navegador
    let telaAtualLink = window.location.href;

    // Define um valor no armazenamento local com a chave 'pagina-atual'
    localStorage.setItem("pagina-atual", telaAtualLink);
}

// Função para armazenar o link atual do conteúdo
/**
 * Define o link atual do conteúdo no localStorage.
 *
 * @param {string} link - O link do conteúdo atual.
 * @returns {void}
 */
function linkAtualDoConteudo(link) {
    localStorage.setItem("conteudoAtual", link);
}

// Função para remover informações da página atual e conteúdo atual do armazenamento local
/**
 * Remove a página atual e seu conteúdo do localStorage do navegador.
 * Se um índice for fornecido, atualiza a barra de progresso correspondente.
 *
 * @param {number} index - O índice da página atual.
 * @returns {void}
 */
function removePaginaAtual(index) {
    localStorage.removeItem("pagina-atual");
    localStorage.removeItem("conteudoAtual");
    // localStorage.removeItem("pontos-atual");

    if (!index) {
        localStorage.removeItem("userProgress");
        localStorage.removeItem("pageIndex");
    }

    if (index) {
        reduceUserProgress(index);
    }
}

function parabens(index) {
    localStorage.removeItem("pagina-atual");
    localStorage.removeItem("conteudoAtual");
    if (index) {
        progressBar(index);
    }
}

/**
 * Reduz o progresso do usuário com base no índice fornecido.
 *
 * @param {number} index - O índice usado para determinar a redução do progresso.
 * @returns {void}
 */
function reduceUserProgress(index) {
    const updatedIndex = index - 1;

    if (updatedIndex === 0) {
        localStorage.removeItem("userProgress");
        localStorage.removeItem("pageIndex");
    }
    if (updatedIndex === 1) {
        updateUserProgressInLocalStorage(updatedIndex, "10");
    }
    if (updatedIndex === 2) {
        updateUserProgressInLocalStorage(updatedIndex, "20");
    }
    if (updatedIndex === 3) {
        updateUserProgressInLocalStorage(updatedIndex, "30");
    }
    if (updatedIndex === 4) {
        updateUserProgressInLocalStorage(updatedIndex, "40");
    }
    if (updatedIndex === 5) {
        updateUserProgressInLocalStorage(updatedIndex, "50");
    }
    if (updatedIndex === 6) {
        updateUserProgressInLocalStorage(updatedIndex, "60");
    }
    if (updatedIndex === 7) {
        updateUserProgressInLocalStorage(updatedIndex, "70");
    }
    if (updatedIndex === 8) {
        updateUserProgressInLocalStorage(updatedIndex, "80");
    }
    if (updatedIndex === 9) {
        updateUserProgressInLocalStorage(updatedIndex, "90");
    }
}

/**
 * Atualiza o progresso do usuário e o índice da página no localStorage do navegador.
 *
 * @param {number} pageIndex - O índice da página atual.
 * @param {string} userProgress - O progresso do usuário.
 * @returns {void}
 */
function updateUserProgressInLocalStorage(pageIndex, userProgress) {
    localStorage.setItem("userProgress", userProgress);
    localStorage.setItem("pageIndex", pageIndex);
}

function getUserProgress(userProgress) {
    localStorage.getItem("userProgress", userProgress);
}

/**
 * Atualiza o nível de zoom no localStorage do navegador.
 *
 * @param {number} zoom - O nível de zoom a ser armazenado.
 * @returns {void}
 */
function zoomStorage(zoom) {
    localStorage.setItem("zoom", zoom);
}

// Score
function storeScore(pontosAtual) {
    localStorage.setItem("pontos-atual", pontosAtual);
    // localStorage.setItem("status-score", statusScore);
    AtualizaScore();
}

// Quantidade de erros no exercicio em cada etapa
function errosExec(erros) {
    localStorage.setItem("erros", erros);
}