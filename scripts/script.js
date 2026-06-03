/* =========================================================
   APOSENTELA - SCRIPT PRINCIPAL
========================================================= */

/* ---------- Saudação dinâmica ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const icone    = document.getElementById('icone-saudacao');
    const saudacao = document.getElementById('texto-saudacao');
    const contexto = document.getElementById('texto-contexto');
    if (!saudacao) return;

    const nomeUsuario = obterNomeUsuario();
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) {
        if (icone) icone.textContent = '☀️';
        saudacao.textContent = `Bom dia, ${nomeUsuario}! ☀️`;
        if (contexto) contexto.textContent = 'Veja o que seus amigos compartilharam esta manhã 💚';
    } else if (hora >= 12 && hora < 18) {
        if (icone) icone.textContent = '🌤️';
        saudacao.textContent = `Boa tarde, ${nomeUsuario}! 🌤️`;
        if (contexto) contexto.textContent = 'Veja o que seus amigos compartilharam hoje 💚';
    } else {
        if (icone) icone.textContent = '🌙';
        saudacao.textContent = `Boa noite, ${nomeUsuario}! 🌙`;
        if (contexto) contexto.textContent = 'Veja o que seus amigos compartilharam hoje 💚';
    }
});

/* =========================================================
   ACESSIBILIDADE: FONTE
   - Alterna entre 3 níveis (normal, grande, muito grande)
   - Texto do botão muda conforme o estado
========================================================= */

let nivelFonte = 0;

function atualizarRotuloBotaoFonte() {
    const btn = document.getElementById('btn-fonte');
    if (!btn) return;

    if (nivelFonte === 0) {
        btn.innerHTML = '🔤 Aumentar Tamanho';
        btn.title = 'Aumentar tamanho do texto';
    } else if (nivelFonte === 1) {
        btn.innerHTML = '🔤 Aumentar Mais';
        btn.title = 'Aumentar ainda mais o texto';
    } else {
        btn.innerHTML = '🔤 Diminuir Tamanho';
        btn.title = 'Voltar ao tamanho normal';
    }

    btn.classList.toggle('ativo', nivelFonte > 0);
}

function alternarFonteGrande() {
    document.body.classList.remove('fonte-grande', 'fonte-muito-grande');
    nivelFonte = (nivelFonte + 1) % 3;

    if (nivelFonte === 1) document.body.classList.add('fonte-grande');
    if (nivelFonte === 2) document.body.classList.add('fonte-muito-grande');

    localStorage.setItem('nivelFonte', nivelFonte);
    atualizarRotuloBotaoFonte();
}

function alternarAltoContraste() {
    document.body.classList.toggle('alto-contraste');
    const btn = document.getElementById('btn-contraste');
    const ativo = document.body.classList.contains('alto-contraste');
    if (btn) btn.classList.toggle('ativo', ativo);
    localStorage.setItem('altoContraste', ativo);
}

document.addEventListener('DOMContentLoaded', () => {
    const fonteSalva = parseInt(localStorage.getItem('nivelFonte')) || 0;
    nivelFonte = fonteSalva;

    if (nivelFonte === 1) document.body.classList.add('fonte-grande');
    if (nivelFonte === 2) document.body.classList.add('fonte-muito-grande');

    atualizarRotuloBotaoFonte();

    if (localStorage.getItem('altoContraste') === 'true') {
        document.body.classList.add('alto-contraste');
        const btn = document.getElementById('btn-contraste');
        if (btn) btn.classList.add('ativo');
    }
});

/* =========================================================
   NAVEGAÇÃO E UTILIDADES
========================================================= */

const mapaDeRotas = {
    'tela-inicio':            'inicio.html',
    'tela-nova-publicacao':   'nova-publicacao.html',
    'tela-mensagens':         'mensagens.html',
    'tela-perfil':            'perfil.html',
    'tela-login':             'index.html',
};

function irParaTela(idTela) {
    const rota = mapaDeRotas[idTela];
    if (rota) window.location.href = rota;
}

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

function exibirNotificacao(mensagem, tipo) {
    const notif = document.getElementById('notificacao');
    if (!notif) return;
    notif.textContent = mensagem;
    notif.className = 'notificacao ' + (tipo || 'sucesso') + ' visivel';
    setTimeout(() => notif.classList.remove('visivel'), 3000);
}

function fecharModal(idOpcional) {
    if (idOpcional) {
        const m = document.getElementById(idOpcional);
        if (m) m.classList.remove('aberto');
        return;
    }
    document.querySelectorAll('.fundo-modal').forEach(m => m.classList.remove('aberto'));
}

function abrirModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('aberto');
}

/* =========================================================
   LOGIN
========================================================= */

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

document.addEventListener('DOMContentLoaded', () => {
    const campoSenha = document.getElementById('campo-senha');
    if (campoSenha) {
        campoSenha.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') fazerLogin();
        });
    }
});

/* =========================================================
   SAIR DA CONTA
========================================================= */

function sairDaConta() {
    abrirModal('modal-sair');
}

function confirmarSaida() {
    mostrarCarregando('Saindo...');
    setTimeout(() => {
        ocultarCarregando();
        window.location.href = 'index.html';
    }, 800);
}

/* =========================================================
   NOVA PUBLICAÇÃO
========================================================= */

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

/* =========================================================
   CURTIR
========================================================= */

function curtir(btn) {
    const contador = btn.querySelector('.contador-curtidas');
    if (!contador) return;
    let numero = parseInt(contador.textContent);

    if (btn.classList.contains('curtido')) {
        btn.classList.remove('curtido');
        contador.textContent = (numero - 1) + ' Curtir';
    } else {
        btn.classList.add('curtido');
        contador.textContent = (numero + 1) + ' Curtir';
        btn.animate(
            [{ transform: 'scale(1)' }, { transform: 'scale(1.18)' }, { transform: 'scale(1)' }],
            { duration: 300 }
        );
    }
}

/* =========================================================
   COMENTAR — abre/fecha a área de comentários e envia
========================================================= */

function comentar(btn) {
    const publicacao = btn.closest('.publicacao');
    if (!publicacao) return;

    let area = publicacao.querySelector('.area-comentarios');
    if (!area) {
        area = document.createElement('div');
        area.className = 'area-comentarios';
        area.innerHTML = `
            <div class="lista-comentarios"></div>
            <div class="form-comentario">
                <input type="text" class="campo-comentario" placeholder="💬 Escreva um comentário..." aria-label="Escreva um comentário">
                <button class="botao-enviar-comentario" type="button">Enviar</button>
            </div>
        `;
        publicacao.appendChild(area);

        const campo = area.querySelector('.campo-comentario');
        const enviar = area.querySelector('.botao-enviar-comentario');

        enviar.addEventListener('click', () => enviarComentario(area));
        campo.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') enviarComentario(area);
        });
    }

    const aberto = area.classList.toggle('aberto');
    if (aberto) {
        area.querySelector('.campo-comentario').focus();
    }
}

function enviarComentario(area) {
    const campo = area.querySelector('.campo-comentario');
    const texto = campo.value.trim();
    if (!texto) {
        exibirNotificacao('⚠️ Escreva algo antes de comentar.', 'erro');
        return;
    }

    const lista = area.querySelector('.lista-comentarios');
    const item = document.createElement('div');
    item.className = 'comentario-item';
    item.innerHTML = `
        <strong>${obterNomeUsuario()}:</strong> ${escapeHTML(texto)}
    `;
    lista.appendChild(item);

    campo.value = '';
    exibirNotificacao('✅ Comentário publicado!', 'sucesso');
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

/* =========================================================
   COMPARTILHAR — modal com lista de amigos
========================================================= */

function compartilhar(btn) {
    const publicacao = btn.closest('.publicacao');
    const titulo = publicacao?.querySelector('.publicacao-titulo')?.textContent || 'publicação';
    abrirModalCompartilhar(titulo);
}

function abrirModalCompartilhar(tituloPub) {
    let modal = document.getElementById('modal-compartilhar');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-compartilhar';
        modal.className = 'fundo-modal';
        modal.innerHTML = `
            <div class="caixa-modal">
                <div class="modal-titulo">↗️ Enviar para um amigo</div>
                <div class="modal-texto">Escolha para quem deseja enviar esta publicação:</div>
                <div class="lista-amigos-compartilhar">
                    <label class="amigo-compartilhar"><input type="checkbox" value="Graças"> 👩‍🦳 Graças</label>
                    <label class="amigo-compartilhar"><input type="checkbox" value="Zézin"> 👴 Zézin</label>
                    <label class="amigo-compartilhar"><input type="checkbox" value="Dona Tereza"> 👵 Dona Tereza</label>
                    <label class="amigo-compartilhar"><input type="checkbox" value="Antônio Carlos"> 👨‍🦲 Antônio Carlos</label>
                </div>
                <div class="modal-botoes">
                    <button class="botao-fechar-modal" type="button" onclick="fecharModal('modal-compartilhar')">Cancelar</button>
                    <button class="botao-confirmar-modal" type="button" onclick="confirmarCompartilhar()">Enviar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.dataset.titulo = tituloPub;
    modal.classList.add('aberto');
}

function confirmarCompartilhar() {
    const modal = document.getElementById('modal-compartilhar');
    if (!modal) return;
    const selecionados = Array.from(modal.querySelectorAll('input[type=checkbox]:checked'))
        .map(c => c.value);

    if (selecionados.length === 0) {
        exibirNotificacao('⚠️ Escolha pelo menos um amigo.', 'erro');
        return;
    }

    modal.classList.remove('aberto');
    modal.querySelectorAll('input[type=checkbox]').forEach(c => c.checked = false);
    exibirNotificacao(`✅ Enviado para ${selecionados.length} amigo(s)!`, 'sucesso');
}

/* =========================================================
   FILTRO DE CATEGORIA (inicio.html)
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const containerCategorias = document.getElementById('categorias-fixas');
    if (!containerCategorias) return;

    const itens = containerCategorias.querySelectorAll('.item-categoria');
    itens.forEach(item => {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');

        item.addEventListener('click', () => aplicarFiltroCategoria(item));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                aplicarFiltroCategoria(item);
            }
        });
    });

    if (itens.length > 0) itens[0].classList.add('categoria-ativa');
});

function aplicarFiltroCategoria(item) {
    const texto = item.textContent.trim().toLowerCase();

    document.querySelectorAll('.item-categoria').forEach(i => i.classList.remove('categoria-ativa'));
    item.classList.add('categoria-ativa');

    const publicacoes = document.querySelectorAll('.lista-publicacoes .publicacao');
    let visiveis = 0;

    if (texto.includes('tudo') || texto.includes('ver mais')) {
        publicacoes.forEach(p => { p.style.display = ''; visiveis++; });
    } else {
        publicacoes.forEach(p => {
            const cat = (p.querySelector('.publicacao-categoria')?.textContent || '').toLowerCase();
            const combina =
                (texto.includes('saúde') && cat.includes('saúde')) ||
                (texto.includes('eventos') && cat.includes('evento')) ||
                (texto.includes('dicas') && (cat.includes('dica') || cat.includes('alimentação')));
            if (combina) {
                p.style.display = '';
                visiveis++;
            } else {
                p.style.display = 'none';
            }
        });
    }

    atualizarMensagemVazia(visiveis);
}

function atualizarMensagemVazia(visiveis) {
    const lista = document.querySelector('.lista-publicacoes');
    if (!lista) return;

    let vazio = document.getElementById('feed-vazio');
    if (visiveis === 0) {
        if (!vazio) {
            vazio = document.createElement('div');
            vazio.id = 'feed-vazio';
            vazio.className = 'feed-vazio';
            vazio.innerHTML = '🔎 Nenhuma publicação encontrada para esse filtro.';
            lista.appendChild(vazio);
        }
        vazio.style.display = 'block';
    } else if (vazio) {
        vazio.style.display = 'none';
    }
}

/* =========================================================
   BARRA DE PESQUISA
   - inicio.html → filtra publicações
   - mensagens.html → filtra conversas
   - perfil.html → filtra minhas publicações
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    const campo = document.getElementById('campo-pesquisa');
    if (!campo) return;

    campo.addEventListener('input', () => {
        const termo = campo.value.trim().toLowerCase();
        const ehInicio = !!document.querySelector('.lista-publicacoes');
        const ehMensagens = !!document.getElementById('lista-conversas');
        const ehPerfil = !!document.querySelector('.mini-publicacao');

        if (ehInicio) pesquisarPublicacoes(termo);
        if (ehMensagens) pesquisarConversas(termo);
        if (ehPerfil) pesquisarMinhasPublicacoes(termo);
    });
});

function pesquisarPublicacoes(termo) {
    const publicacoes = document.querySelectorAll('.lista-publicacoes .publicacao');
    let visiveis = 0;

    publicacoes.forEach(p => {
        const conteudo = p.textContent.toLowerCase();
        const visivel = !termo || conteudo.includes(termo);
        p.style.display = visivel ? '' : 'none';
        if (visivel) visiveis++;
    });

    atualizarMensagemVazia(visiveis);
}

function pesquisarConversas(termo) {
    const itens = document.querySelectorAll('#lista-conversas .item-conversa');
    itens.forEach(it => {
        const nome = (it.querySelector('.nome-contato')?.textContent || '').toLowerCase();
        const previa = (it.querySelector('.previa-mensagem')?.textContent || '').toLowerCase();
        const visivel = !termo || nome.includes(termo) || previa.includes(termo);
        it.style.display = visivel ? '' : 'none';
    });
}

function pesquisarMinhasPublicacoes(termo) {
    const itens = document.querySelectorAll('.mini-publicacao');
    itens.forEach(p => {
        const conteudo = p.textContent.toLowerCase();
        p.style.display = (!termo || conteudo.includes(termo)) ? '' : 'none';
    });
}

/* =========================================================
   MENSAGENS
========================================================= */

const historicoConversas = {
    'Graças':         [{ de: 'outro', texto: 'Boa tarde! 🌷' }],
    'Zézin':          [{ de: 'outro', texto: 'Forró hoje cuida 🎶' }],
    'Dona Tereza':    [{ de: 'outro', texto: 'Vou te mandar a receita depois 🍲' }],
    'Antônio Carlos': [{ de: 'outro', texto: 'Tudo bem por aí? 👋' }],
};

let conversaAtual = null;

document.addEventListener('DOMContentLoaded', () => {
    const lista = document.getElementById('lista-conversas');
    const area  = document.getElementById('area-conversa');
    if (lista) lista.style.display = 'block';
    if (area)  area.style.display  = 'none';

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
            ${escapeHTML(m.texto)}
        </div>
    `).join('');
    container.scrollTop = container.scrollHeight;
}

function enviarMensagem() {
    const campo = document.getElementById('campo-digitar');
    if (!campo || !campo.value.trim() || !conversaAtual) return;

    if (!historicoConversas[conversaAtual]) historicoConversas[conversaAtual] = [];
    historicoConversas[conversaAtual].push({ de: 'eu', texto: campo.value.trim() });
    campo.value = '';
    renderizarMensagens();
}

/* =========================================================
   PERFIL: editar perfil + configurações (notificações etc.)
========================================================= */

function obterNomeUsuario() {
    return localStorage.getItem('nomeUsuario') || 'Carlos Eduardo';
}

function obterBioUsuario() {
    return localStorage.getItem('bioUsuario') || 'Aposentado • Amante de música';
}

function obterLocalUsuario() {
    return localStorage.getItem('localUsuario') || 'Recife, Pernambuco';
}

document.addEventListener('DOMContentLoaded', () => {
    const nomeEl = document.querySelector('.nome-perfil');
    const bioEl  = document.querySelector('.bio-perfil');

    if (nomeEl) nomeEl.textContent = obterNomeUsuario();
    if (bioEl) {
        bioEl.innerHTML =
            escapeHTML(obterBioUsuario()) + '<br>' + escapeHTML(obterLocalUsuario());
    }
});

function abrirEditarPerfil() {
    let modal = document.getElementById('modal-editar-perfil');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-editar-perfil';
        modal.className = 'fundo-modal';
        modal.innerHTML = `
            <div class="caixa-modal">
                <div class="modal-titulo">✏️ Editar Perfil</div>
                <div class="modal-texto" style="margin-bottom:14px;">Atualize seus dados. As mudanças são salvas no seu navegador.</div>

                <label class="rotulo-campo-modal" for="editar-nome">👤 Nome</label>
                <input id="editar-nome" class="campo-modal" type="text" placeholder="Seu nome">

                <label class="rotulo-campo-modal" for="editar-bio">📝 Sobre você</label>
                <input id="editar-bio" class="campo-modal" type="text" placeholder="Conte algo sobre você">

                <label class="rotulo-campo-modal" for="editar-local">📍 Cidade</label>
                <input id="editar-local" class="campo-modal" type="text" placeholder="Sua cidade">

                <div class="mensagem-erro-campo" id="erro-editar-perfil" style="display:none;">⚠️ Preencha pelo menos o nome.</div>

                <div class="modal-botoes">
                    <button class="botao-fechar-modal" type="button" onclick="fecharModal('modal-editar-perfil')">Cancelar</button>
                    <button class="botao-confirmar-modal" type="button" onclick="salvarPerfil()">Salvar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    document.getElementById('editar-nome').value  = obterNomeUsuario();
    document.getElementById('editar-bio').value   = obterBioUsuario();
    document.getElementById('editar-local').value = obterLocalUsuario();
    document.getElementById('erro-editar-perfil').style.display = 'none';
    modal.classList.add('aberto');
}

function salvarPerfil() {
    const nome  = document.getElementById('editar-nome').value.trim();
    const bio   = document.getElementById('editar-bio').value.trim();
    const local = document.getElementById('editar-local').value.trim();
    const erro  = document.getElementById('erro-editar-perfil');

    if (!nome) {
        erro.style.display = 'block';
        return;
    }

    localStorage.setItem('nomeUsuario', nome);
    localStorage.setItem('bioUsuario',  bio  || 'Aposentado • Amante de música');
    localStorage.setItem('localUsuario', local || 'Recife, Pernambuco');

    const nomeEl = document.querySelector('.nome-perfil');
    const bioEl  = document.querySelector('.bio-perfil');
    if (nomeEl) nomeEl.textContent = nome;
    if (bioEl) {
        bioEl.innerHTML =
            escapeHTML(bio || 'Aposentado • Amante de música') +
            '<br>' +
            escapeHTML(local || 'Recife, Pernambuco');
    }

    fecharModal('modal-editar-perfil');
    exibirNotificacao('✅ Perfil atualizado com sucesso!', 'sucesso');
}

function abrirNotificacoes() {
    let modal = document.getElementById('modal-notificacoes');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-notificacoes';
        modal.className = 'fundo-modal';
        modal.innerHTML = `
            <div class="caixa-modal">
                <div class="modal-titulo">🔔 Notificações</div>
                <div class="modal-texto" style="margin-bottom:14px;">Escolha o que deseja receber:</div>
                <label class="opcao-toggle"><input type="checkbox" checked> Curtidas em minhas publicações</label>
                <label class="opcao-toggle"><input type="checkbox" checked> Novas mensagens</label>
                <label class="opcao-toggle"><input type="checkbox"> Sugestões de amigos</label>
                <label class="opcao-toggle"><input type="checkbox" checked> Comentários nas minhas publicações</label>
                <div class="modal-botoes">
                    <button class="botao-fechar-modal" type="button" onclick="fecharModal('modal-notificacoes')">Cancelar</button>
                    <button class="botao-confirmar-modal" type="button" onclick="salvarConfiguracao('modal-notificacoes','Notificações')">Salvar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.classList.add('aberto');
}

function abrirPrivacidade() {
    let modal = document.getElementById('modal-privacidade');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-privacidade';
        modal.className = 'fundo-modal';
        modal.innerHTML = `
            <div class="caixa-modal">
                <div class="modal-titulo">🔒 Privacidade</div>
                <div class="modal-texto" style="margin-bottom:14px;">Defina quem pode ver seu conteúdo:</div>
                <label class="opcao-toggle"><input type="radio" name="quem-ve" checked> Apenas meus amigos</label>
                <label class="opcao-toggle"><input type="radio" name="quem-ve"> Todos no Aposentela</label>
                <label class="opcao-toggle"><input type="radio" name="quem-ve"> Apenas eu</label>
                <div style="margin-top:14px;">
                    <label class="opcao-toggle"><input type="checkbox" checked> Permitir que me encontrem pelo nome</label>
                    <label class="opcao-toggle"><input type="checkbox"> Mostrar quando estou online</label>
                </div>
                <div class="modal-botoes">
                    <button class="botao-fechar-modal" type="button" onclick="fecharModal('modal-privacidade')">Cancelar</button>
                    <button class="botao-confirmar-modal" type="button" onclick="salvarConfiguracao('modal-privacidade','Privacidade')">Salvar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.classList.add('aberto');
}

function abrirAjuda() {
    let modal = document.getElementById('modal-ajuda');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-ajuda';
        modal.className = 'fundo-modal';
        modal.innerHTML = `
            <div class="caixa-modal">
                <div class="modal-titulo">🆘 Ajuda e Suporte</div>
                <div class="modal-texto">
                    Precisa de ajuda? Estamos aqui para você.
                    <br><br>
                    📞 Central de atendimento: <strong>(81) 3000-0000</strong>
                    <br>
                    📧 Email: <strong>ajuda@aposentela.com</strong>
                    <br><br>
                    Você também pode pedir ajuda a um familiar ou responsável.
                </div>
                <div class="modal-botoes">
                    <button class="botao-fechar-modal" type="button" onclick="fecharModal('modal-ajuda')">Fechar</button>
                    <button class="botao-confirmar-modal" type="button" onclick="fecharModal('modal-ajuda'); exibirNotificacao('✅ Mensagem enviada ao suporte!','sucesso')">Pedir Ajuda</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.classList.add('aberto');
}

function salvarConfiguracao(idModal, nome) {
    fecharModal(idModal);
    exibirNotificacao(`✅ ${nome} atualizadas com sucesso!`, 'sucesso');
}

/* =========================================================
   FINALIZAÇÃO
========================================================= */

document.addEventListener('DOMContentLoaded', ocultarCarregando);
