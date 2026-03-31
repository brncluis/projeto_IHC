var faixa = document.getElementById('carrossel-faixa');

        faixa.innerHTML = faixa.innerHTML + faixa.innerHTML;

        var titulos = {
            'tela-inicio': 'Aposentela',
            'tela-mensagens': 'Mensagens',
            'tela-nova-publicacao': 'Nova Publicação',
            'tela-perfil': 'Meu Perfil'
        };

        var historico = {
            'Graças': [
                { quem: 'eles', texto: 'Olá amiga', hora: '14:20' },

                { quem: 'eu',   texto: 'Oi amiguxa', hora: '14:25' },
                { quem: 'eles', texto: 'Saudades', hora: '14:32' }
            ],
            'José Roberto': [
                { quem: 'eu',   texto: 'Vou no evento', hora: '10:50' },
                { quem: 'eles', texto: 'Legal', hora: '11:00' },
                { quem: 'eles', texto: 'Até lá', hora: '11:05' }
            ],
            'Tereza Aparecida': [
                { quem: 'eu',   texto: 'Pode me mandar a receita?', hora: 'Ontem' },
                { quem: 'eles', texto: 'Vou te mandar a receita', hora: 'Ontem' }
            ],
            'Antônio Carlos': [
                { quem: 'eles', texto: 'Tudo bem por ai?', hora: 'Segunda' }
            ]
        };

        var conversaAberta = '';

        function exibirNotificacao(mensagem, tipo) {
            var el = document.getElementById('notificacao'); 
            el.textContent = mensagem;                       
            el.className = 'notificacao ' + tipo + ' visivel'; 
            setTimeout(function() {                          
                el.className = 'notificacao';                
            }, 3000);
        }

        function mostrarCarregando(texto) {
            document.getElementById('texto-carregando').textContent = texto; 
            document.getElementById('tela-carregando').classList.add('ativa'); 
        }

        function esconderCarregando() {
            document.getElementById('tela-carregando').classList.remove('ativa'); 
        }

        function fecharModal() {
            document.getElementById('modal-senha').classList.remove('aberto'); 
        }

        function fazerLogin() {
            var usuario = document.getElementById('campo-usuario').value.trim(); 
            var senha = document.getElementById('campo-senha').value.trim();     
            var tudoCerto = true; 

            document.getElementById('campo-usuario').classList.remove('invalido');
            document.getElementById('campo-senha').classList.remove('invalido');
            document.getElementById('erro-usuario').classList.remove('visivel');
            document.getElementById('erro-senha').classList.remove('visivel');
            document.getElementById('caixa-erro-login').classList.remove('visivel');

            if (usuario == '') {
                document.getElementById('campo-usuario').classList.add('invalido'); 
                document.getElementById('erro-usuario').classList.add('visivel');   
                tudoCerto = false; 
            }

            if (senha == '') {
                document.getElementById('campo-senha').classList.add('invalido');
                document.getElementById('erro-senha').classList.add('visivel');
                tudoCerto = false;
            }

            if (tudoCerto == false) {
                return; 
            }

            var botao = document.getElementById('botao-entrar');
            botao.disabled = true;               
            botao.textContent = 'Entrando...';   
            mostrarCarregando('Verificando seus dados...'); 

            setTimeout(function() {
                esconderCarregando();      
                botao.disabled = false;    
                botao.textContent = 'Entrar'; 

                if (usuario != 'admin' || senha != '1234') {

                    document.getElementById('campo-usuario').classList.add('invalido');
                    document.getElementById('campo-senha').classList.add('invalido');
                    document.getElementById('caixa-erro-login').classList.add('visivel');
                    exibirNotificacao('❌ Usuário ou senha incorretos', 'erro');
                    return; 
                }

                exibirNotificacao('✅ Bem-vindo, Carlos Eduardo!', 'sucesso'); 
                document.getElementById('barra-topo').style.display = 'flex'; 
                document.getElementById('barra-nav').style.display = 'flex';  
                document.getElementById('tela-login').style.display = 'none'; 
                irParaTela('tela-inicio', document.querySelector('.barra-nav a')); 

            }, 1800); 
        }

        document.getElementById('campo-senha').addEventListener('keydown', function(e) {
            if (e.key == 'Enter') { 
                fazerLogin();       
            }
        });

        function irParaTela(idTela, botaoNav) {
            if (event) event.preventDefault(); 

            if (idTela != 'tela-mensagens') {
                voltarParaLista(false); 
            }

            var todasTelas = document.querySelectorAll('.tela');
            for (var i = 0; i < todasTelas.length; i++) {
                todasTelas[i].classList.remove('ativa');
            }

            document.getElementById(idTela).classList.add('ativa');

            if (botaoNav != null) { 
                var botoes = document.querySelectorAll('.barra-nav a');
                for (var i = 0; i < botoes.length; i++) {
                    botoes[i].classList.remove('ativo'); 
                }
                botaoNav.classList.add('ativo'); 
            }

            document.getElementById('titulo-topo').textContent = titulos[idTela] || 'Aposentela';

            if (idTela == 'tela-inicio') {
                document.getElementById('campo-pesquisa').style.display = ''; 
            } else {
                document.getElementById('campo-pesquisa').style.display = 'none'; 
            }
        }

        function curtir(botao) {
            botao.classList.toggle('curtido'); 
            var contador = botao.querySelector('.contador-curtidas'); 
            var icone = botao.querySelector('.icone-botao');          
            var numero = parseInt(contador.textContent);              

            if (botao.classList.contains('curtido')) {

                contador.textContent = numero + 1; 
                icone.textContent = '💚';           
                exibirNotificacao('💚 Você curtiu essa publicação!', 'sucesso');
            } else {

                contador.textContent = numero - 1; 
                icone.textContent = '❤️';           
            }
        }

        function atualizarContador() {
            var texto = document.getElementById('texto-publicacao').value; 
            var contador = document.getElementById('contador-letras');     
            contador.textContent = texto.length + ' / 300 caracteres';    

            if (texto.length >= 280) {
                contador.classList.add('no-limite');    
            } else {
                contador.classList.remove('no-limite'); 
            }
        }

        function publicar() {
            var texto = document.getElementById('texto-publicacao').value.trim(); 
            var categoria = document.getElementById('categoria-publicacao').value; 
            var tudoCerto = true; 

            document.getElementById('texto-publicacao').classList.remove('invalido');
            document.getElementById('categoria-publicacao').classList.remove('invalido');
            document.getElementById('erro-texto-publicacao').classList.remove('visivel');
            document.getElementById('erro-categoria-publicacao').classList.remove('visivel');

            if (texto == '') {
                document.getElementById('texto-publicacao').classList.add('invalido');
                document.getElementById('erro-texto-publicacao').classList.add('visivel');
                tudoCerto = false;
            }

            if (categoria == '') {
                document.getElementById('categoria-publicacao').classList.add('invalido');
                document.getElementById('erro-categoria-publicacao').classList.add('visivel');
                tudoCerto = false;
            }

            if (tudoCerto == false) {
                exibirNotificacao('⚠️ Preencha todos os campos', 'erro');
                return;
            }

            mostrarCarregando('Publicando...');

            setTimeout(function() {
                esconderCarregando(); 
                document.getElementById('formulario-publicacao').style.display = 'none'; 
                document.getElementById('tela-sucesso-publicacao').classList.add('visivel'); 
                exibirNotificacao('✅ Publicação enviada!', 'sucesso');
            }, 1500);
        }

        function reiniciarFormulario() {
            document.getElementById('texto-publicacao').value = '';       
            document.getElementById('categoria-publicacao').value = '';   
            document.getElementById('contador-letras').textContent = '0 / 300 caracteres'; 
            document.getElementById('formulario-publicacao').style.display = '';           
            document.getElementById('tela-sucesso-publicacao').classList.remove('visivel'); 
        }

        function abrirConversa(nome, classeAvatar, emoji) {
            conversaAberta = nome; 
            document.getElementById('lista-conversas').style.display = 'none'; 
            document.getElementById('area-conversa').classList.add('aberta'); 
            document.getElementById('nome-na-conversa').textContent = nome;   

            var foto = document.getElementById('foto-contato-conversa');
            foto.className = 'foto-contato ' + classeAvatar; 
            foto.textContent = emoji;                          

            mostrarMensagens(); 
        }

        function mostrarMensagens() {
            var area = document.getElementById('mensagens-conversa'); 
            var mensagens = historico[conversaAberta] || [];           
            var html = ''; 

            for (var i = 0; i < mensagens.length; i++) {
                var m = mensagens[i]; 
                var lado = m.quem == 'eu' ? 'enviada' : 'recebida'; 
                var alinhamento = m.quem == 'eu' ? 'right' : 'left'; 
                html += '<div>';
                html += '<div class="balao-mensagem ' + lado + '">' + m.texto + '</div>'; 
                html += '<div class="hora-balao" style="text-align:' + alinhamento + '">' + m.hora + '</div>'; 
                html += '</div>';
            }

            area.innerHTML = html; 
            area.scrollTop = area.scrollHeight; 
        }

        function enviarMensagem() {
            var campo = document.getElementById('campo-digitar'); 
            var texto = campo.value.trim(); 

            if (texto == '') {
                exibirNotificacao('⚠️ Digite uma mensagem antes de enviar', 'erro'); 
                return; 
            }

            var agora = new Date();
            var horas = agora.getHours().toString().padStart(2, '0');     
            var minutos = agora.getMinutes().toString().padStart(2, '0'); 
            var hora = horas + ':' + minutos;                             

            if (!historico[conversaAberta]) {
                historico[conversaAberta] = [];
            }

            historico[conversaAberta].push({ quem: 'eu', texto: texto, hora: hora });
            campo.value = ''; 
            mostrarMensagens(); 
        }

        document.getElementById('campo-digitar').addEventListener('keydown', function(e) {
            if (e.key == 'Enter') { 
                enviarMensagem();   
            }
        });

        function voltarParaLista(mostrar) {
            if (mostrar == undefined) mostrar = true; 
            document.getElementById('area-conversa').classList.remove('aberta'); 
            if (mostrar) {
                document.getElementById('lista-conversas').style.display = ''; 
            }
            conversaAberta = ''; 
        }

        function sairDaConta() {
            document.getElementById('modal-sair').classList.add('aberto');
        }

        function confirmarSaida() {
            document.getElementById('modal-sair').classList.remove('aberto');
            mostrarCarregando('Saindo...');
            setTimeout(function() {
                esconderCarregando();
                document.getElementById('barra-topo').style.display = 'none';
                document.getElementById('barra-nav').style.display = 'none';

                var todasTelas = document.querySelectorAll('.tela');
                for (var i = 0; i < todasTelas.length; i++) {
                    todasTelas[i].classList.remove('ativa');
                }

                document.getElementById('tela-login').classList.add('ativa');
                document.getElementById('tela-login').style.display = 'flex';
                document.getElementById('campo-usuario').value = '';
                document.getElementById('campo-senha').value = '';
                document.getElementById('caixa-erro-login').classList.remove('visivel');
            }, 1000);
        }