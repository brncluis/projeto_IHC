/* ══ CARROSSEL ══ */
const track = document.getElementById('track');
track.innerHTML += track.innerHTML;

/* ══ TOAST ══ */
let toastTimer;
function mostrarToast(msg, tipo) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast ' + tipo + ' mostrar';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.className = 'toast', 3000);
}

/* ══ LOADING ══ */
function mostrarLoading(txt) {
    document.getElementById('loading-texto').textContent = txt || 'Carregando...';
    document.getElementById('overlay-loading').classList.add('ativo');
}
function esconderLoading() {
    document.getElementById('overlay-loading').classList.remove('ativo');
}

/* ══ MODAL ══ */
function fecharModal() {
    document.getElementById('modal-senha').classList.remove('aberto');
}

/* ══ LOGIN ══ */
function tentarLogin() {
    const usuario = document.getElementById('input-usuario').value.trim();
    const senha   = document.getElementById('input-senha').value.trim();
    let ok = true;

    // Limpar estados anteriores
    ['input-usuario','input-senha'].forEach(id => {
        document.getElementById(id).classList.remove('invalido');
    });
    ['erro-usuario','erro-senha'].forEach(id => {
        document.getElementById(id).classList.remove('visivel');
    });
    document.getElementById('alerta-login').classList.remove('visivel');

    // Validação de campos vazios
    if (!usuario) {
        document.getElementById('input-usuario').classList.add('invalido');
        document.getElementById('erro-usuario').classList.add('visivel');
        ok = false;
    }
    if (!senha) {
        document.getElementById('input-senha').classList.add('invalido');
        document.getElementById('erro-senha').classList.add('visivel');
        ok = false;
    }
    if (!ok) return;

    // Estado: carregando
    const btn = document.getElementById('btn-entrar');
    btn.disabled = true;
    btn.textContent = 'Entrando...';
    mostrarLoading('Verificando seus dados...');

    setTimeout(() => {
        esconderLoading();
        btn.disabled = false;
        btn.textContent = 'Entrar';

        // Fluxo alternativo: credenciais erradas
        if (usuario !== 'admin' || senha !== '1234') {
            document.getElementById('input-usuario').classList.add('invalido');
            document.getElementById('input-senha').classList.add('invalido');
            document.getElementById('alerta-login').classList.add('visivel');
            mostrarToast('❌ Usuário ou senha incorretos', 'erro');
            return;
        }

        // Fluxo principal: sucesso
        mostrarToast('✅ Bem-vindo, Carlos Eduardo!', 'sucesso');
        document.getElementById('topo').style.display = 'flex';
        document.getElementById('nav-inferior').style.display = 'flex';
        document.getElementById('pg-login').style.display = 'none';
        irPara('inicio', document.querySelector('.nav-inferior a'));
    }, 1800);
}

// Enter no campo de senha
document.getElementById('input-senha').addEventListener('keydown', e => {
    if (e.key === 'Enter') tentarLogin();
});

/* ══ NAVEGAÇÃO ══ */
const titulos = {
    inicio: 'ConectaVida',
    mensagens: 'Mensagens',
    'nova-pub': 'Nova Publicação',
    perfil: 'Meu Perfil'
};
const mostrarPesquisa = { inicio: true, mensagens: false, 'nova-pub': false, perfil: false };

function irPara(pg, link) {
    if (event) event.preventDefault();
    if (pg !== 'mensagens') voltarMensagens(false);

    document.querySelectorAll('.pagina').forEach(p => p.classList.remove('ativa'));
    document.getElementById('pg-' + pg).classList.add('ativa');

    if (link) {
        document.querySelectorAll('.nav-inferior a').forEach(a => a.classList.remove('ativo'));
        link.classList.add('ativo');
    }

    document.getElementById('topo-titulo').textContent = titulos[pg] || 'ConectaVida';
    document.getElementById('barra-pesquisa').style.display = mostrarPesquisa[pg] ? '' : 'none';
}

/* ══ CURTIR ══ */
function curtir(btn) {
    btn.classList.toggle('curtido');
    const cnt = btn.querySelector('.cnt');
    const icone = btn.querySelector('.btn-icone');
    let n = parseInt(cnt.textContent);
    if (btn.classList.contains('curtido')) {
        cnt.textContent = n + 1; icone.textContent = '💚';
        mostrarToast('💚 Você curtiu essa publicação!', 'sucesso');
    } else {
        cnt.textContent = n - 1; icone.textContent = '❤️';
    }
}

/* ══ NOVA PUBLICAÇÃO ══ */
function contarChars() {
    const txt = document.getElementById('pub-texto').value;
    const cont = document.getElementById('contador');
    cont.textContent = txt.length + ' / 300 caracteres';
    cont.classList.toggle('limite', txt.length >= 280);
}

function publicar() {
    const texto = document.getElementById('pub-texto').value.trim();
    const cat   = document.getElementById('pub-categoria').value;
    let ok = true;

    document.getElementById('pub-texto').classList.remove('invalido');
    document.getElementById('pub-categoria').classList.remove('invalido');
    document.getElementById('erro-pub-texto').classList.remove('visivel');
    document.getElementById('erro-pub-cat').classList.remove('visivel');

    if (!texto) {
        document.getElementById('pub-texto').classList.add('invalido');
        document.getElementById('erro-pub-texto').classList.add('visivel');
        ok = false;
    }
    if (!cat) {
        document.getElementById('pub-categoria').classList.add('invalido');
        document.getElementById('erro-pub-cat').classList.add('visivel');
        ok = false;
    }
    if (!ok) { mostrarToast('⚠️ Preencha todos os campos', 'erro'); return; }

    mostrarLoading('Publicando...');
    setTimeout(() => {
        esconderLoading();
        document.getElementById('nova-pub-form').style.display = 'none';
        document.getElementById('pub-sucesso').classList.add('visivel');
        mostrarToast('✅ Publicação enviada!', 'sucesso');
    }, 1500);
}

function novaPubReset() {
    document.getElementById('pub-texto').value = '';
    document.getElementById('pub-categoria').value = '';
    document.getElementById('contador').textContent = '0 / 300 caracteres';
    document.getElementById('nova-pub-form').style.display = '';
    document.getElementById('pub-sucesso').classList.remove('visivel');
}

/* ══ MENSAGENS ══ */
const conversas = {
    'Maria das Graças': [
        { de:'eles', texto:'Olá! Vi sua publicação sobre caminhada 😊', hora:'14:20' },
        { de:'eu',   texto:'Que bom! Tem me ajudado muito!', hora:'14:25' },
        { de:'eles', texto:'Boa tarde! Vi sua publicação sobre caminhada 😊', hora:'14:32' },
    ],
    'José Roberto': [
        { de:'eu',   texto:'Vou ao evento no parque no sábado!', hora:'10:50' },
        { de:'eles', texto:'Ótimo! Vai ser muito bom 🎵', hora:'11:00' },
        { de:'eles', texto:'Até sábado então! Vai ser ótimo 🎵', hora:'11:05' },
    ],
    'Tereza Aparecida': [
        { de:'eu',   texto:'Adorei a ideia da sopa! Pode me mandar a receita?', hora:'Ontem' },
        { de:'eles', texto:'Claro! Vou te mandar a receita completa, espera! 🍲', hora:'Ontem' },
    ],
    'Antônio Carlos': [
        { de:'eles', texto:'Tudo bem por aí? Faz tempo que não nos falamos', hora:'Segunda' },
    ],
};
let convAtual = '';

function abrirConversa(nome, classeAvatar, emoji) {
    convAtual = nome;
    document.getElementById('msg-lista').style.display = 'none';
    document.getElementById('conversa-wrap').classList.add('aberta');
    document.getElementById('conv-nome').textContent = nome;
    const av = document.getElementById('conv-avatar');
    av.className = 'msg-avatar ' + classeAvatar;
    av.textContent = emoji;
    renderizarMsgs();
}

function renderizarMsgs() {
    const c = document.getElementById('conv-msgs');
    const msgs = conversas[convAtual] || [];
    c.innerHTML = msgs.map(m => `
        <div>
            <div class="balao ${m.de === 'eu' ? 'enviado' : 'recebido'}">${m.texto}</div>
            <div class="balao-hora" style="text-align:${m.de==='eu'?'right':'left'}">${m.hora}</div>
        </div>
    `).join('');
    c.scrollTop = c.scrollHeight;
}

function enviarMsg() {
    const campo = document.getElementById('campo-msg');
    const texto = campo.value.trim();
    if (!texto) { mostrarToast('⚠️ Digite uma mensagem antes de enviar', 'erro'); return; }
    const agora = new Date();
    const hora = agora.getHours().toString().padStart(2,'0') + ':' + agora.getMinutes().toString().padStart(2,'0');
    conversas[convAtual] = conversas[convAtual] || [];
    conversas[convAtual].push({ de:'eu', texto, hora });
    campo.value = '';
    renderizarMsgs();
}

document.getElementById('campo-msg').addEventListener('keydown', e => {
    if (e.key === 'Enter') enviarMsg();
});

function voltarMensagens(mostrar = true) {
    document.getElementById('conversa-wrap').classList.remove('aberta');
    if (mostrar) document.getElementById('msg-lista').style.display = '';
    convAtual = '';
}

/* ══ SAIR ══ */
function confirmarSaida() {
    if (confirm('Deseja realmente sair da sua conta?')) {
        mostrarLoading('Saindo...');
        setTimeout(() => {
            esconderLoading();
            document.getElementById('topo').style.display = 'none';
            document.getElementById('nav-inferior').style.display = 'none';
            document.querySelectorAll('.pagina').forEach(p => p.classList.remove('ativa'));
            document.getElementById('pg-login').classList.add('ativa');
            document.getElementById('pg-login').style.display = '';
            document.getElementById('input-usuario').value = '';
            document.getElementById('input-senha').value = '';
            document.getElementById('alerta-login').classList.remove('visivel');
        }, 1000);
    }
}