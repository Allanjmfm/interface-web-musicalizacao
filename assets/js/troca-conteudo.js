// Função que chama a função trocaConteudo com os argumentos passados
/**
 * Chama a função trocaConteudo para substituir o conteúdo de um elemento especificado com o conteúdo de um arquivo.
 *
 * @param {string} proxConteudo - O arquivo de onde carregar o conteúdo.
 * @param {string} id - O ID do elemento para substituir o conteúdo.
 * @returns {void}
 */
function trocaConteudoEtapas(proxConteudo, id) {
    trocaConteudo(proxConteudo, id);
}

// Script para troca de conteúdo
/**
 * Carrega e substitui o conteúdo de um elemento especificado com o conteúdo de um arquivo.
 *
 * @async
 * @param {string} arquivo - O arquivo de onde carregar o conteúdo.
 * @param {string} id - O ID do elemento para substituir o conteúdo.
 * @param {Function} cb - A função de retorno a ser executada após a substituição do conteúdo.
 * @returns {Promise<Function|string>} - A função de retorno ou uma string vazia.
 */
async function trocaConteudo(arquivo, id, cb) {
    let xhttp;
    // Obtém o elemento do DOM com o id especificado
    const mainContainer = document.querySelector(id);

    try {
        if (arquivo) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // Define o conteúdo do elemento com a resposta do servidor
                    mainContainer.innerHTML = this.responseText;
                    setTimeout(CheckDarkmode, 10);
                }
            }
            xhttp.open("GET", arquivo, true);
            xhttp.send();
            return cb() ? cb : ""; // Retorna a função de retorno ou uma string vazia
        }
        if (typeof(cb) === 'function') {
            cb();
        }
    } catch (e) {}

}