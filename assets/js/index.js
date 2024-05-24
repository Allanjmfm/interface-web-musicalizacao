// let home = origin + '/public/index.html';

// Verifica se a chave 'pagina-atual' existe no armazenamento local
if (localStorage.getItem('pagina-atual') !== null) {
    // Obtém o valor associado à chave 'pagina-atual' do armazenamento local
    let paginaAtual = localStorage.getItem('pagina-atual');

    // Redireciona para a página obtida do armazenamento local
    location.replace(paginaAtual);
}