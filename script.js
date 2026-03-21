
const botoes = document.querySelectorAll('.nav-item');
const telas = document.querySelectorAll('.tela');

function trocarTela(idTela) {
    telas.forEach(tela => {
        tela.classList.remove('ativa');
    });

    const telaAtiva = document.getElementById(idTela);
    if (telaAtiva) {
        telaAtiva.classList.add('ativa');
    }
}

function ativarBotao(botaoClicado) {
    botoes.forEach(botao => {
        botao.classList.remove('ativo');
    });

    botaoClicado.classList.add('ativo');
}

botoes.forEach((botao, index) => {
    botao.addEventListener('click', (e) => {
        e.preventDefault();

        let telaId;

        if (index === 0) telaId = 'tela-inicio';
        if (index === 1) telaId = 'tela-mensagens';
        if (index === 2) telaId = 'tela-perfil';

        trocarTela(telaId);
        ativarBotao(botao);

        localStorage.setItem('telaAtiva', telaId);
    });
});


trocarTela('tela-inicio');
botoes[0].classList.add('ativo');