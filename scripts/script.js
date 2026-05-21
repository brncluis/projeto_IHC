document.addEventListener('DOMContentLoaded', () => {
    const icone    = document.getElementById('icone-saudacao');
    const saudacao = document.getElementById('texto-saudacao');
    const contexto = document.getElementById('texto-contexto');
    if (!saudacao) return;

    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) {
        if (icone) icone.textContent = '☀️';
        saudacao.textContent = 'Bom dia, Carlos! ☀️';
        if (contexto) contexto.textContent = 'Veja o que seus amigos compartilharam esta manhã 💚';
    } else if (hora >= 12 && hora < 18) {
        if (icone) icone.textContent = '🌤️';
        saudacao.textContent = 'Boa tarde, Carlos! 🌤️';
        if (contexto) contexto.textContent = 'Veja o que seus amigos compartilharam hoje 💚';
    } else {
        if (icone) icone.textContent = '🌙';
        saudacao.textContent = 'Boa noite, Carlos! 🌙';
        if (contexto) contexto.textContent = 'Veja o que seus amigos compartilharam hoje 💚';
    }
});

let nivelFonte = 0;

function alternarFonteGrande() {

    document.body.classList.remove('fonte-grande', 'fonte-muito-grande');

    nivelFonte = (nivelFonte + 1) % 3;

    if (nivelFonte === 1) {
        document.body.classList.add('fonte-grande');
    }

    if (nivelFonte === 2) {
        document.body.classList.add('fonte-muito-grande');
    }

    localStorage.setItem('nivelFonte', nivelFonte);

    const btn = document.getElementById('btn-fonte');

    if (btn) {
        btn.classList.toggle('ativo', nivelFonte > 0);
    }
}

// 10. Acessibilidade: Alto contraste
function alternarAltoContraste() {
    document.body.classList.toggle('alto-contraste');
    const btn = document.getElementById('btn-contraste');
    if (btn) btn.classList.add('ativo');
    localStorage.setItem('altoContraste', document.body.classList.contains('alto-contraste'));
}

// Restaura preferências ao carregar qualquer página
document.addEventListener('DOMContentLoaded', () => {
    const fonteSalva = parseInt(localStorage.getItem('nivelFonte')) || 0;

    nivelFonte = fonteSalva;

    if (nivelFonte === 1) {
        document.body.classList.add('fonte-grande');
    }

    if (nivelFonte === 2) {
        document.body.classList.add('fonte-muito-grande');
    }

    const btn = document.getElementById('btn-fonte');

    if (btn && nivelFonte > 0) {
        btn.classList.add('ativo');
    }
    if (localStorage.getItem('altoContraste') === 'true') {
        document.body.classList.add('alto-contraste');
        const btn = document.getElementById('btn-contraste');
        if (btn) btn.classList.add('ativo');
    }
});

const mapaDeRotas = {
    'tela-inicio':            'inicio.html',
    'tela-nova-publicacao':   'nova-publicacao.html',
    'tela-mensagens':         'mensagens.html',
    'tela-perfil':            'perfil.html',
    'tela-login':             'index.html',
};

function irParaTela(idTela, elNav) {
    const rota = mapaDeRotas[idTela];
    if (rota) {
        window.location.href = rota;
    }
}

// Tela de Carregamento
function mostrarCarregando(texto) {
    const tela = document.getElementById('tela-carregando');
    const textoEl = document.getElementById('texto-carregando');
    if (tela) {
        if (textoEl && texto) textoEl.textContent = texto;
        tela.classList.add('ativa');
    }
}

function ocultarCarregando() {
    const tela = document.getElementById('tela-carregando');
    if (tela) tela.classList.remove('ativa');
}

// Notificações
function exibirNotificacao(mensagem, tipo) {
    const notif = document.getElementById('notificacao');
    if (!notif) return;
    notif.textContent = mensagem;
    notif.className = 'notificacao ' + (tipo || 'sucesso') + ' visivel';
    setTimeout(() => notif.classList.remove('visivel'), 3000);
}

// Modais
function fecharModal() {
    document.querySelectorAll('.fundo-modal').forEach(m => m.classList.remove('aberto'));
}

// LOGIN (index.html)

function fazerLogin() {
    const usuario = document.getElementById('campo-usuario')?.value.trim();
    const senha   = document.getElementById('campo-senha')?.value.trim();
    const erroUsuario = document.getElementById('erro-usuario');
    const erroSenha   = document.getElementById('erro-senha');
    const caixaErro   = document.getElementById('caixa-erro-login');

    let valido = true;

    if (erroUsuario) erroUsuario.style.display = 'none';
    if (erroSenha)   erroSenha.style.display   = 'none';
    if (caixaErro)   caixaErro.style.display    = 'none';

    if (!usuario) {
        if (erroUsuario) erroUsuario.style.display = 'block';
        valido = false;
    }
    if (!senha) {
        if (erroSenha) erroSenha.style.display = 'block';
        valido = false;
    }
    if (!valido) return;

    if (usuario === 'admin' && senha === '1234') {
        mostrarCarregando('Entrando...');
        setTimeout(() => {
            ocultarCarregando();
            window.location.href = 'inicio.html';
        }, 1200);
    } else {
        if (caixaErro) caixaErro.style.display = 'block';
    }
}

// Permite pressionar Enter no campo de senha para logar
document.addEventListener('DOMContentLoaded', () => {
    const campoSenha = document.getElementById('campo-senha');
    if (campoSenha) {
        campoSenha.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') fazerLogin();
        });
    }
});

// SAIR DA CONTA
function sairDaConta() {
    const modal = document.getElementById('modal-sair');
    if (modal) modal.classList.add('aberto');
}

function confirmarSaida() {
    mostrarCarregando('Saindo...');
    setTimeout(() => {
        ocultarCarregando();
        window.location.href = 'index.html';
    }, 800);
}

// NOVA PUBLICAÇÃO (nova-publicacao.html)
function atualizarContador() {
    const campo    = document.getElementById('texto-publicacao');
    const contador = document.getElementById('contador-letras');
    if (campo && contador) {
        contador.textContent = campo.value.length + ' / 300 caracteres';
    }
}

function publicar() {
    const texto     = document.getElementById('texto-publicacao')?.value.trim();
    const categoria = document.getElementById('categoria-publicacao')?.value;
    const erroTexto = document.getElementById('erro-texto-publicacao');
    const erroCateg = document.getElementById('erro-categoria-publicacao');

    let valido = true;

    if (erroTexto) erroTexto.style.display = 'none';
    if (erroCateg) erroCateg.style.display = 'none';

    if (!texto) {
        if (erroTexto) erroTexto.style.display = 'block';
        valido = false;
    }
    if (!categoria) {
        if (erroCateg) erroCateg.style.display = 'block';
        valido = false;
    }
    if (!valido) return;

    mostrarCarregando('Publicando...');
    setTimeout(() => {
        ocultarCarregando();
        document.getElementById('formulario-publicacao').style.display = 'none';
        document.getElementById('tela-sucesso-publicacao').style.display = 'flex';
    }, 1000);
}

function reiniciarFormulario() {
    const form = document.getElementById('formulario-publicacao');
    const sucesso = document.getElementById('tela-sucesso-publicacao');
    if (form) form.style.display = 'block';
    if (sucesso) sucesso.style.display = 'none';

    const campo = document.getElementById('texto-publicacao');
    const categ = document.getElementById('categoria-publicacao');
    if (campo) campo.value = '';
    if (categ) categ.value = '';
    atualizarContador();
}

function curtir(btn) {

    const contador = btn.querySelector('.contador-curtidas');

    if (!contador) return;

    let numero = parseInt(contador.textContent);

    if (btn.classList.contains('curtido')) {

        btn.classList.remove('curtido');

        contador.textContent = numero - 1;

    } else {

        btn.classList.add('curtido');

        contador.textContent = numero + 1;

        btn.animate(
            [
                { transform: 'scale(1)' },
                { transform: 'scale(1.18)' },
                { transform: 'scale(1)' }
            ],
            {
                duration: 300
            }
        );
    }
}
// MENSAGENS (mensagens.html)
const historicoConversas = {
    'Graças':         [{ de: 'outro', texto: 'Boa tarde!' }],
    'Zézin':          [{ de: 'outro', texto: 'Forró hoje cuida 🎶' }],
    'Dona Tereza':    [{ de: 'outro', texto: 'Vou te mandar a receita depois 🍲' }],
    'Antônio Carlos': [{ de: 'outro', texto: 'Tudo bem por aí?' }],
};

let conversaAtual = null;

// Garante estado inicial correto ao carregar a página de mensagens
document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('lista-conversas');
    const area  = document.getElementById('area-conversa');
    if (lista) lista.style.display = 'block';
    if (area)  area.style.display  = 'none';

    // Enviar mensagem com Enter
    const campoDigitar = document.getElementById('campo-digitar');
    if (campoDigitar) {
        campoDigitar.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') enviarMensagem();
        });
    }
});

function abrirConversa(nome, classesFoto, emoji) {
    conversaAtual = nome;

    const lista  = document.getElementById('lista-conversas');
    const area   = document.getElementById('area-conversa');
    const fotoEl = document.getElementById('foto-contato-conversa');
    const nomeEl = document.getElementById('nome-na-conversa');

    // Esconde a lista e mostra a conversa (substituindo, não empilhando)
    if (lista) lista.style.display = 'none';
    if (area)  area.style.display  = 'flex';

    if (fotoEl) {
        fotoEl.className = 'foto-contato ' + classesFoto;
        fotoEl.textContent = emoji || '';
    }
    if (nomeEl) nomeEl.textContent = nome;

    renderizarMensagens();
}

function voltarParaLista() {
    conversaAtual = null;
    const lista = document.getElementById('lista-conversas');
    const area  = document.getElementById('area-conversa');
    if (lista) lista.style.display = 'block';
    if (area)  area.style.display  = 'none';
}

function renderizarMensagens() {
    const container = document.getElementById('mensagens-conversa');
    if (!container || !conversaAtual) return;

    const msgs = historicoConversas[conversaAtual] || [];
    container.innerHTML = msgs.map(m => `
        <div class="balao-mensagem ${m.de === 'eu' ? 'enviada' : 'recebida'}">
            ${m.texto}
        </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
}

function enviarMensagem() {
    const campo = document.getElementById('campo-digitar');
    if (!campo || !campo.value.trim() || !conversaAtual) return;

    if (!historicoConversas[conversaAtual]) {
        historicoConversas[conversaAtual] = [];
    }
    historicoConversas[conversaAtual].push({ de: 'eu', texto: campo.value.trim() });
    campo.value = '';
    renderizarMensagens();
}

document.addEventListener('DOMContentLoaded', ocultarCarregando);