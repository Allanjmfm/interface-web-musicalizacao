// Variável dark mode
const darkMode = document.querySelector("#dark-mode");
const contrast = document.querySelector("#dark-menu");

// Variável root
const root = document.querySelector(":root");
const trocaColor = getComputedStyle(root);

// Variável troca de conteúdo
const selecaoEtapa = document.querySelector("#btn_sel_etapas");

// IDs para trocas de conteudos
const mainContainer = "#main-container";
const idConteudoEtapas = "#conteudo-etapas";

// Variável para número de tentativas dos exercícios
let tentativas = 2;

// Variável nome da pasta do projeto no github para o link
let nomeFolder = "/interface-web-musicalizacao"

// Variável para o Zoom (Mobile e Desktop)
let zoomLevel;

if (Math.round(window.devicePixelRatio) === 1) {
  zoomLevel = Math.round(window.devicePixelRatio * 100);
} else if (Math.round(window.devicePixelRatio) === 2) {
  zoomLevel = Math.round(window.devicePixelRatio * 50);
} else if (Math.round(window.devicePixelRatio) === 4) {
  zoomLevel = Math.round(window.devicePixelRatio * 25);
} else {
  zoomLevel = 100;
}
localStorage.setItem("zoomLevel", zoomLevel);

// Função Dark Mode
if (JSON.parse(localStorage.getItem("dark-mode"))) {
  addDarkMode();
} else {
  removeDarkMode();
}

//Função adicionar modo escuro
function addDarkMode() {
  let stateCheck = setInterval(async () => {
    // Verifica se o documento está totalmente carregado
    if (document.readyState === "complete") {
      darkMode.classList.add("dark-mode");
      document.querySelector("#sobre-menu").classList.add("letra-light");
      document.querySelector("#home-menu").classList.add("letra-light");
      document.querySelector("#dark-menu").classList.add("letra-light");
      document.querySelector("#font-menu").classList.add("letra-light");
      document
        .querySelectorAll("button")
        .forEach((a) => a.classList.add("btn-dark-mode"));
      document
        .querySelectorAll("a")
        .forEach((a) => a.classList.add("btn-dark-mode"));
      document
        .querySelectorAll("span")
        .forEach((a) => a.classList.add("btn-dark-mode"));
      document.querySelector("footer").classList.add("footer-dark-mode");

      root.style.setProperty(
        "--progress-container-color",
        trocaColor.getPropertyValue("--dark-mode")
      );
      clearInterval(stateCheck);
    }
  }, 10);
}

//Função remover modo escuro
/**
 * Remove os estilos do modo escuro dos elementos na página.
 *
 * @returns {void}
 */
function removeDarkMode() {
  darkMode.classList.remove("dark-mode");
  document.querySelector("#sobre-menu").classList.remove("letra-light");
  document.querySelector("#home-menu").classList.remove("letra-light");
  document.querySelector("#dark-menu").classList.remove("letra-light");
  document.querySelector("#font-menu").classList.remove("letra-light");
  document
    .querySelectorAll("button")
    .forEach((a) => a.classList.remove("btn-dark-mode"));
  document
    .querySelectorAll("a")
    .forEach((a) => a.classList.remove("btn-dark-mode"));
  document
    .querySelectorAll("span")
    .forEach((a) => a.classList.remove("btn-dark-mode"));
  document.querySelector("footer").classList.remove("footer-dark-mode");

  root.style.setProperty(
    "--progress-container-color",
    trocaColor.getPropertyValue("--light-mode")
  );
}

// Função de verificar se está em darkmode o contéudo da página html
/**
 * Verifica se o modo escuro está ativado e aplica os estilos correspondentes aos botões e links.
 *
 * @returns {void}
 */
function CheckDarkmode() {
  let stateCheck = setInterval(async () => {
    // Verifica se o documento está totalmente carregado
    if (document.readyState === "complete") {
      let isDark = JSON.parse(localStorage.getItem("dark-mode"));
      if (isDark) {
        document.querySelectorAll("button").forEach((a) => {
          if (!a.classList.contains("btn-dark-mode")) {
            a.classList.add("btn-dark-mode");
          }
        });
        document.querySelectorAll("a").forEach((a) => {
          if (!a.classList.contains("btn-dark-mode")) {
            a.classList.add("btn-dark-mode");
          }
        });
        document.querySelectorAll("span").forEach((a) => {
          if (!a.classList.contains("btn-dark-mode")) {
            a.classList.add("btn-dark-mode");
          }
        });
      }
      clearInterval(stateCheck);
    }
  }, 10);
}

// Lista de objeto arquivo Json para os conteúdos iniciais de cada etapa
let telas = {
  telaInicial: "views/index.html",
  selecaoEtapas: "views/selecao_etapas.html",
  etapa1Tela1: "/views/etapa1/conteudo_inicial1.html",
  etapa2Tela1: "/views/etapa2/conteudo_inicial2.html",
  etapa3Tela1: "/views/etapa3/conteudo_inicial3.html",
  etapa4Tela1: "/views/etapa4/conteudo_inicial4.html",
  etapa5Tela1: "/views/etapa5/conteudo_inicial5.html",
  etapa6Tela1: "/views/etapa6/conteudo_inicial6.html",
  etapa7Tela1: "/views/etapa7/conteudo_inicial7.html",
  etapa8Tela1: "/views/etapa8/conteudo_inicial8.html",
  etapa9Tela1: "/views/etapa9/conteudo_inicial9.html",
  etapa10Tela1: "/views/etapa10/conteudo_inicial10.html",
};

// Função para selecionar as etapas
/**
 * Manipula o evento de clique do botão para navegar para uma nova etapa.
 *
 * @async
 * @param {string} linkTelaInicialEtapas - O link para a tela inicial da etapa.
 * @returns {Promise<void>}
 */
async function btnEtapa(linkTelaInicialEtapas) {
  await trocaConteudo(linkTelaInicialEtapas, mainContainer);
  setTimeout(CheckDarkmode, 10);
}

// Função da alternativa correta nos exercícios
/**
 * Manipula o evento de resposta correta, atualizando a interface, avançando para o próximo conteúdo e verificando o modo escuro.
 *
 * @param {string} proxConteudo - O link para o próximo conteúdo.
 * @param {number} index - O índice usado para o acompanhamento do progresso.
 * @param {string} id - O ID do elemento de conteúdo.
 * @returns {void}
 */
function otrec(proxConteudo, index, statusScore, endEX, id) {
  // Seleciona o elemento com a classe "otrec" (resposta correta) e todos os elementos com a classe "odarre" (respostas erradas)
  const respCertaDiv = document.querySelector(".otrec");
  const respErradaDiv = document.querySelectorAll(".odarre");

  // Seleciona o elemento com o ID "mensagem"
  const div = document.getElementById("mensagem");

  // Verifica se o elemento não tem a classe "msg-certa-cor"
  if (!div.classList.contains("msg-certa-cor")) {
    // Remove a classe "msg-incorrta-cor" se estiver presente
    if (div.classList.remove("msg-incorrta-cor")) {
      div.classList.remove("msg-incorrta-cor");
    }
    // Adiciona a classe "msg-certa-cor"
    div.classList.add("msg-certa-cor");
  }

  try {
    // Adiciona classes aos elementos de resposta certa e desabilita-os
    respCertaDiv.classList.add("btn-resp-certa");
    respCertaDiv.classList.add("disabled-btn");

    // Itera sobre os elementos de resposta errada e os desabilita
    Array.from(respErradaDiv).map((e) => e.classList.add("disabled-btn"));
  } catch {}

  // Define o conteúdo do elemento "mensagem"
  div.innerHTML = "Resposta Certa. Mandou bem.";

  // Atualiza a barra de progresso com base no índice
  progressBar(index);

  // Se o número de tentativas for menor que 2, atualize-o para 2
  tentativas = Math.max(tentativas, 2);

  if (endEX) {
    console.log(endEX);
    rediParaParabens(index);
  } else {
    // Aguarda 1 segundo (1000 milissegundos) antes de executar algumas ações
    setTimeout(async () => {
      // Aguarda a troca de conteúdo
      await trocaConteudo(proxConteudo, id || idConteudoEtapas);

      // Aguarda a atualização do link de conteúdo
      linkAtualDoConteudo(proxConteudo);

      // Aguarda 10 milissegundos antes de executar CheckDarkmode
      setTimeout(CheckDarkmode, 10);
    }, 1000);
  }

  // score(statusScore);
}

// Função da alternativa incorreta nos exercícios
/**
 * Manipula o evento quando uma resposta incorreta é selecionada, atualizando a interface e gerenciando as tentativas restantes.
 *
 * @async
 * @param {string} revisaoEtapa - O link para a etapa de revisão.
 * @param {number} index - O índice usado para o acompanhamento do progresso.
 * @returns {Promise<void>}
 */
async function odarre(proxConteudo, index, asd, endEX, id) {
  const respCerta = document.querySelector(".otrec");
  const respErrada = document.querySelectorAll(".odarre");

  const div = document.getElementById("mensagem");

  if (!div.classList.contains("msg-incorrta-cor")) {
    if (div.classList.remove("msg-certa-cor")) {
      div.classList.remove("msg-certa-cor");
    }
    div.classList.add("msg-incorrta-cor");
  }

  if (tentativas != 1) {
    div.innerHTML = "";

    tentativas -= 1;

    div.innerHTML = `Resposta Incorreta. Tente novamente. ${tentativas} tentativa restante`;
  } else {
    tentativas = 2;

    div.innerHTML = "Que pena, resposta incorreta.";

    // Atualiza a barra de progresso com base no índice
    progressBar(index);

    for (let i = 1; i <= index; i++) {
      if (i == index && localStorage.getItem("erros") != null) {
        let erros = JSON.parse(localStorage.getItem("erros"));
        let int = index - 1;
        if (erros !== null) {
          erros[int].erro += 1;
          let arrayErros = JSON.stringify(erros);
          localStorage.setItem("erros", arrayErros);
          // errosExec(JSON.stringify(arrayErros))
        }
      }
    }

    // Se o número de tentativas for menor que 2, atualize-o para 2
    tentativas = Math.max(tentativas, 2);

    if (endEX) {
      console.log(endEX);
      rediParaParabens(index);
    } else {
      setTimeout(async () => {
        // Aguarda a troca de conteúdo
        await trocaConteudo(proxConteudo, id || idConteudoEtapas);

        // Aguarda a atualização do link de conteúdo
        linkAtualDoConteudo(proxConteudo);

        // Aguarda 10 milissegundos antes de executar CheckDarkmode
        setTimeout(CheckDarkmode, 10);
      }, 1000);
    }
    // Aguarda 1 segundo (1000 milissegundos) antes de executar algumas ações

    // score(statusScore);
  }
}

// Função Score para calcular a pontuação do usuário nos exercícios

function score(pontosGanhos) {
  // let pontosGanhos = parseInt(localStorage.getItem("pontos-ganhos"));
  const pontosAnterior = parseInt(localStorage.getItem("pontos-atual"));
  let pontosAtual = pontosGanhos + pontosAnterior;

  // let statusScore = parseInt(localStorage.getItem("status-score"));

  // if (index > statusScore) {
  //     MensagemScore();
  // }
  storeScore(pontosAtual);

  //     if (pontosGanhos < 5) {
  //         localStorage.setItem("pontos-ganhos", 5);
  //     }
}

function AtualizaScore() {
  const pontosAtuais = localStorage.getItem("pontos-atual");
  let spanPontos = document.getElementsByClassName("pontos");
  if (spanPontos.length === 1) {
    spanPontos[0].innerHTML = pontosAtuais;
  }
}

function refazerExec(link, index) {
  const ini = index - 1;
  let doc = JSON.parse(localStorage.getItem("erros"));
  doc[ini].erro = 0;
  let arrayErrosString = JSON.stringify(doc)
  localStorage.setItem("erros", arrayErrosString);

  recomecaEtapa(link, index);
}

function callotrec(link, index, statusScore, exercNum) {
  otrec(link, index, statusScore);
  checkErros(index, exercNum);
  //   statusRefazer(index);
  mostraPontos(index, exercNum);
}

function checkErros(index, exercNum) {
  for (let i = 1; i <= index; i++) {
    if (i == index) {
      let int = index - 1;
      if (!JSON.parse(localStorage.getItem("erros"))[int].etapa) {
        if (localStorage.getItem("erros") != null) {
          let scoreTotal = exercNum * 5;
          let erros = JSON.parse(localStorage.getItem("erros"));
          let scoreGanho = scoreTotal - erros[int].erro * 5;

          score(scoreGanho);
          if (erros !== null) {
            let erroAtual = erros[int].erro;
            erros[int].erroAnterior = erroAtual;
            // erros[int].erro = 0;
            erros[int].etapa = true;
            let arrayErros = JSON.stringify(erros);
            localStorage.setItem("erros", arrayErros);
          }
        }
      } else {
        let erros = JSON.parse(localStorage.getItem("erros"));
        let { erroAnterior } = erros[int];
        let erroAtual = erros[int].erro;

        if (erroAnterior !== 0) {
          let pontoRecuperado;
          if (erroAtual === 0) {
            pontoRecuperado = erroAnterior * 5;
            erros[int].erroAnterior = erroAtual;
          } else if (erroAtual < erroAnterior) {
            let erroAtual_Anterior = erroAnterior - erroAtual;
            pontoRecuperado = erroAtual_Anterior * 5;
            erros[int].erroAnterior = erroAtual;
            // erros[int].erro = 0;
          } else {
            pontoRecuperado = 0;
          }
          score(pontoRecuperado);
          let arrayErros = JSON.stringify(erros);
          localStorage.setItem("erros", arrayErros);
        }
      }
      if (JSON.parse(localStorage.getItem("erros") !== null)) {
        let erros = JSON.parse(localStorage.getItem("erros"));
        if (erros[int].erroAtual === 0 && erros[int].erroAnterior === 0) {
          document.getElementById("refazer");
        }
      }
    }
  }
}

function MensagemScore() {
  const divScore = document.getElementById("msg-score");
  const scorePlus5 = document.querySelector(".plus5");

  if (!divScore.classList.contains("msg-display-flex")) {
    // Remove a classe "msg-display-none" se estiver presente
    if (divScore.classList.remove("msg-display-none")) {
      divScore.classList.remove("msg-display-none");
    }
    // Adiciona a classe "msg-display-flex"
    divScore.classList.add("msg-display-flex");
  }
  divScore.innerHTML = "+5";

  // Adiciona classes aos elementos de resposta certa
  scorePlus5.classList.add("score-Plus5");

  setTimeout(() => {
    divScore.classList.add("msg-display-none");
    divScore.classList.remove("msg-display-flex");
  }, 1000);
}

function mostraPontos(index, exercNum) {
  index -= 1;
  const certaQuestao = document.getElementById("certa-questao");
  const exercicioTotal = document.getElementById("exercicio-total");
  const scorePont = document.getElementById('score-recebido');

  if (JSON.parse(localStorage.getItem("erros")) !== null) {
    const doc = JSON.parse(localStorage.getItem("erros"))[index];
    let certaQ = exercNum - doc.erroAnterior;
    const pt = certaQ * 5;
    certaQuestao.innerHTML = certaQ;
    exercicioTotal.innerHTML = exercNum;
    scorePont.innerHTML=pt;
  }
}

// Função para redirecionar o usuário para recomeçar a etapa
/**
 * Reinicia a etapa atual removendo a página atual e redirecionando para um novo link.
 *
 * @param {string} link - O link para redirecionar.
 * @returns {void}
 */


function recomecaEtapa(link, index) {
  removePaginaAtual();
  if (index) {
    reduceUserProgress(index);
  }
  location.replace(origin + nomeFolder + link);

  let pontosGanhos = parseInt(localStorage.getItem("pontos-ganhos"));

  if (pontosGanhos !== 1 && pontosGanhos !== 0) {
    if (pontosGanhos > 3) {
      pontosGanhos -= 2;
    }
    if (pontosGanhos === 3) {
      pontosGanhos = 1;
    }
  }
}

// Função assíncrona para avançar para o próximo conteúdo
/**
 * Manipula o evento de clique do botão para avançar para a próxima tela, atualizando o conteúdo, a barra de progresso e o modo escuro.
 *
 * @async
 * @param {string} proxConteudo - O link para o próximo conteúdo.
 * @param {number} index - O índice usado para o acompanhamento do progresso.
 * @param {string} id - O ID do elemento de conteúdo.
 * @returns {Promise<void>}
 */
async function btnAvancar(proxConteudo, index, id) {
  // Aguarda a conclusão da função trocaConteudo
  await trocaConteudo(proxConteudo, id || idConteudoEtapas, () => {
    // Quando trocaConteudo é concluída, chama a função linkAtualDoConteudo
    linkAtualDoConteudo(proxConteudo);
  });
  //Chamar a função para atualiza a barra de progresso com base no índice fornecido
  progressBar(index);

  // Aguarda 10 milissegundos antes de executar CheckDarkmode
  // setTimeout(CheckDarkmode, 10);
}

// função para voltar
/**
 * Manipula o evento de clique do botão para voltar a uma tela anterior.
 *
 * @async
 * @param {string} voltar - O link para voltar.
 * @param {string} id - O ID do elemento de conteúdo.
 * @returns {Promise<void>}
 */
async function btnVoltarEtapas(voltar, index, id) {
  await trocaConteudo(voltar, id || idConteudoEtapas, () => {
    linkAtualDoConteudo(proxConteudo);
  });
  if (index) {
    progressBarVoltar(index);
  }
  setTimeout(CheckDarkmode, 10);
}

/**
 * Amplia o zoom do corpo do documento ao aumentar o nível de zoom.
 *
 * @returns {void}
 */
function zoomIn() {
  let zoomLevel = parseInt(localStorage.getItem("zoomLevel"));
  if (zoomLevel >= 200) {
    return;
  }

  zoomLevel += 10;
  zoomStorage(zoomLevel);
  localStorage.setItem("zoomLevel", zoomLevel);
  document.body.style.zoom = zoomLevel.toString() + "%";
}

/**
 * Diminui o zoom do corpo do documento ao diminuir o nível de zoom.
 *
 * @returns {void}
 */
function zoomOut() {
  let zoomLevel = parseInt(localStorage.getItem("zoomLevel"));
  if (zoomLevel <= 70) {
    return;
  }
  zoomLevel -= 10;
  zoomStorage(zoomLevel);
  localStorage.setItem("zoomLevel", zoomLevel);
  document.body.style.zoom = zoomLevel.toString() + "%";
}

/**
 * Atualiza a barra de progresso com base no índice e valor de progresso fornecidos.
 *
 * @param {number} index - O índice usado para determinar o aumento do progresso.
 * @returns {void}
 */
function progressBar(index) {
  index -= 1;

  // Obtém o valor de progresso atual do localStorage
  let progressValue = Number(localStorage.getItem("userProgress"));

  // Verifica se progressValue é um número
  if (typeof progressValue === "number") {
    // Atualiza o progressValue com base no índice fornecido e nos limites de progresso
    if (index === 0 && progressValue <= 10) {
      progressValue += 1.11111;
    }
    if (index === 1 && progressValue <= 20) {
      progressValue += 0.83333;
    }
    if (index === 2 && progressValue <= 30) {
      progressValue += 0.38462;
    }
    if (index === 3 && progressValue <= 40) {
      progressValue += 1.42857;
    }
    if (index === 4 && progressValue <= 50) {
      progressValue += 3.33333;
    }
    if (index === 5 && progressValue <= 60) {
      progressValue += 0.45455;
    }
    if (index === 6 && progressValue <= 70) {
      progressValue += 0.33333;
    }
    if (index === 7 && progressValue <= 80) {
      progressValue += 0.33333;
    }
    if (index === 8 && progressValue <= 90) {
      progressValue += 0.21739;
    }
    if (index === 9 && progressValue <= 100) {
      progressValue += 0.20933;
    }

    // Chama a função updateProgressBar para atualizar a barra de progresso
    updateProgressBar(index, progressValue);
  }
}

/**
 * Atualiza o valor da barra de progresso ao voltar para uma etapa anterior.
 *
 * Esta função atualiza o valor da barra de progresso com base no índice fornecido e no valor de progresso atual armazenado no localStorage.
 *
 * @param {number} index - O índice da etapa para voltar.
 * @returns {void} Esta função não retorna nada.
 */
function progressBarVoltar(index) {
  index -= 1;

  // Obtém o valor de progresso atual do localStorage
  let progressValue = Number(localStorage.getItem("userProgress"));

  // Verifica se progressValue é um número
  if (typeof progressValue === "number") {
    // Atualiza o progressValue com base no índice fornecido e nos limites de progresso
    if (index === 0 && progressValue <= 10) {
      progressValue -= 1.11111;
    }
    if (index === 1 && progressValue <= 20) {
      progressValue -= 0.83333;
    }
    if (index === 2 && progressValue <= 30) {
      progressValue -= 0.38462;
    }
    if (index === 3 && progressValue <= 40) {
      progressValue -= 1.42857;
    }
    if (index === 4 && progressValue <= 50) {
      progressValue -= 3.33333;
    }
    if (index === 5 && progressValue <= 60) {
      progressValue -= 0.45455;
    }
    if (index === 6 && progressValue <= 70) {
      progressValue -= 0.33333;
    }
    if (index === 7 && progressValue <= 80) {
      progressValue -= 0.33333;
    }
    if (index === 8 && progressValue <= 90) {
      progressValue -= 0.21739;
    }
    if (index === 9 && progressValue <= 100) {
      progressValue -= 0.20933;
    }

    // Chama a função updateProgressBar para atualizar a barra de progresso
    updateProgressBar(index, progressValue);
  }
}

/**
 * Atualiza a barra de progresso e suas cores com base no índice e valor de progresso fornecidos.
 *
 * @param {number} index - O índice usado para determinar as cores da barra de progresso e do contêiner.
 * @param {number} progressValue - O valor do progresso a ser exibido na barra de progresso.
 * @returns {void}
 */
function updateProgressBar(index, progressValue) {
  /**
   * Um array de valores de cores para diferentes valores de índice.
   * Cada valor de índice corresponde a uma cor específica para a barra de progresso e o contêiner.
   * O array é estruturado da seguinte forma:
   * [
   *   { 1: "#cor1", 2: "#cor2" },
   *   { 1: "#cor1", 2: "#cor2" },
   *   ...
   * ]
   */
  const arrayColor = [
    // Cores para o índice 1
    {
      1: "#E7322A",
      2: "#FF9B9B",
    },
    // Cores para o índice 2
    {
      1: "#F06222",
      2: "#F4926483",
    },
    // Cores para o índice 3
    {
      1: "#F59421",
      2: "#f8b463",
    },
    // Cores para o índice 4
    {
      1: "#e6cc00",
      2: "#eddb4c",
    },
    // Cores para o índice 5
    {
      1: "#C0CA35",
      2: "#d2d971",
    },
    // Cores para o índice 6
    {
      1: "#7DB341",
      2: "#a4c97a",
    },
    // Cores para o índice 7
    {
      1: "#41A24A",
      2: "#7abd80",
    },
    // Cores para o índice 8
    {
      1: "#1D988D",
      2: "#60b6af",
    },
    // Cores para o índice 9
    {
      1: "#0FAAC3",
      2: "#57c3d5",
    },
    // Cores para o índice 10
    {
      1: "#2591C2",
      2: "#66b2d4",
    },
  ];

  // Arredonda o valor do progresso para um número inteiro
  root.style.setProperty("--progress-value", "" + Math.floor(progressValue));

  // Define as cores da barra de progresso e do contêiner com base no índice
  root.style.setProperty("--progress-color", arrayColor[index][1]);
  root.style.setProperty("--progress-container-bg-color", arrayColor[index][2]);

  updateUserProgressInLocalStorage(index, progressValue);
}

// Sweet Alert (Botão sobre)
function sweetAlert() {
  swal({
    title:
      "Este é um projeto de uma interface Web de musicalização para pessoas surdas como tema do meu TCC.",
    text: "Desenvolvido por Allan Jorge M. Ferreira Mendes",
    button: {
      text: "Voltar",
    },
  });
}

function resetPontos() {
  if (localStorage.getItem("pontos-atual") !== null) {
    localStorage.setItem("pontos-atual", 10);
  }
  if (localStorage.getItem("erros") !== null) {
    let erros = JSON.stringify([
      {
        erro: 0,
        erroAnterior: 0,
        etapa: false,
      },
      {
        erro: 0,
        erroAnterior: 0,
        etapa: false,
      },
      {
        erro: 0,
        erroAnterior: 0,
        etapa: false,
      },
      {
        erro: 0,
        erroAnterior: 0,
        etapa: false,
      },
      {
        erro: 0,
        erroAnterior: 0,
        etapa: false,
      },
      {
        erro: 0,
        erroAnterior: 0,
        etapa: false,
      },
      {
        erro: 0,
        erroAnterior: 0,
        etapa: false,
      },
      {
        erro: 0,
        erroAnterior: 0,
        etapa: false,
      },
      {
        erro: 0,
        erroAnterior: 0,
        etapa: false,
      },
      {
        erro: 0,
        erroAnterior: 0,
        etapa: false,
      },
    ]);
    localStorage.setItem("erros", erros);
  }
  removePaginaAtual();

  swal({
    title: "Você tem certeza?",
    text: "Seus pontos irão ser apagados e você retornará à tela inicial. Não será possivel recuperá-los!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Pronto! Seus pontos foram apagados.", {
        icon: "success",
      }).then((sucess) => {
        let home = window.origin;
        location.replace(home + nomeFolder);
      });
    } else {
      swal("Seus pontos estão salvos!");
    }
  });
}

const telaDaParabens = [
  "/views/etapa1/etapa1_parabens.html",
  "/views/etapa2/etapa2_parabens.html",
  "/views/etapa3/etapa3_parabens.html",
  "/views/etapa4/etapa4_parabens.html",
  "/views/etapa5/etapa5_parabens.html",
  "/views/etapa6/etapa6_parabens.html",
  "/views/etapa7/etapa7_parabens.html",
  "/views/etapa8/etapa8_parabens.html",
  "/views/etapa9/etapa9_parabens.html",
  "/views/etapa10/etapa10_parabens.html",
];

/**
 * Redireciona para uma página de parabéns com base no índice fornecido.
 *
 * Esta função redireciona o usuário para uma página de parabéns com base no índice fornecido. O índice é usado para recuperar o link correspondente do array `telaDaParabens` e substituir a localização atual pelo novo link.
 *
 * @param {number} index - O índice da página de parabéns para redirecionar.
 * @returns {void} Esta função não retorna nada.
 */
function rediParaParabens(index) {
  index -= 1;
  if (index != null) {
    const link = telaDaParabens[index];

    location.replace(origin + nomeFolder + link);
  }
}
