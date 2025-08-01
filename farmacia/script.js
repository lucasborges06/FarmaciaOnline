document.addEventListener('DOMContentLoaded', () => {
    // Objeto com dados dos produtos (pode ficar igual)
    const produtos = {
        '1': {
            nome: 'Vitamina C',
            preco: 'R$ 29,90',
            imagem: 'https://via.placeholder.com/280x200?text=Vitamina+C',
            imagemDetalhes: 'https://via.placeholder.com/400x400?text=Vitamina+C',
            descricao: 'A Vitamina C é essencial para o sistema imunológico, com ação antioxidante e auxiliar na produção de colágeno. Fortalece a imunidade e combate os radicais livres.',
        },
        '2': {
            nome: 'Analgésico',
            preco: 'R$ 15,50',
            imagem: 'https://via.placeholder.com/280x200?text=Analgésico',
            imagemDetalhes: 'https://via.placeholder.com/400x400?text=Analgésico',
            descricao: 'Medicamento indicado para o alívio de dores de cabeça, enxaqueca, dores musculares e febre. Consulte um médico antes de usar.',
        },
        '3': {
            nome: 'Protetor Solar',
            preco: 'R$ 45,00',
            imagem: 'https://via.placeholder.com/280x200?text=Protetor+Solar',
            imagemDetalhes: 'https://via.placeholder.com/400x400?text=Protetor+Solar',
            descricao: 'Filtro solar com alta proteção UVA e UVB. Previne o envelhecimento precoce e o câncer de pele. Ideal para uso diário.',
        },
        '4': {
            nome: 'Shampoo Neutro',
            preco: 'R$ 22,00',
            imagem: 'https://via.placeholder.com/280x200?text=Shampoo+Neutro',
            imagemDetalhes: 'https://via.placeholder.com/400x400?text=Shampoo+Neutro',
            descricao: 'Shampoo de uso diário, com pH neutro que limpa os cabelos sem agredir os fios. Indicado para todos os tipos de cabelo.',
        },
        '5': {
            nome: 'Máscara Facial',
            preco: 'R$ 35,00',
            imagem: 'https://via.placeholder.com/280x200?text=Mascara+Facial',
            imagemDetalhes: 'https://via.placeholder.com/400x400?text=Mascara+Facial',
            descricao: 'Máscara facial hidratante com extratos naturais. Promove uma pele mais macia e radiante. Ideal para a rotina de skincare.',
        }
    };

    // ----------------------------------------------------
    // Carrega produtos na página principal (mantém igual)
    // ----------------------------------------------------
    const listaProdutos = document.querySelector('.lista-produtos');
    if (listaProdutos) {
        let htmlProdutos = '';
        for (const id in produtos) {
            const produto = produtos[id];
            htmlProdutos += `
                <div class="produto">
                    <a href="produto.html?id=${id}">
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <div class="produto-info">
                            <h3>${produto.nome}</h3>
                            <p>${produto.preco}</p>
                        </div>
                    </a>
                </div>
            `;
        }
        listaProdutos.innerHTML = htmlProdutos;
    }
    
    // ----------------------------------------------------
    // Funcionalidade da Página de Produto (redireciona para o pagamento)
    // ----------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');

    if (produtoId && document.querySelector('.detalhes-produto')) {
        const produto = produtos[produtoId];
        if (produto) {
            document.getElementById('titulo-produto').textContent = produto.nome;
            document.getElementById('nome-produto').textContent = produto.nome;
            document.getElementById('img-produto').src = produto.imagemDetalhes;
            document.getElementById('img-produto').alt = produto.nome;
            document.getElementById('preco-produto').textContent = produto.preco;
            document.getElementById('descricao-produto').textContent = produto.descricao;

            const botaoCompra = document.querySelector('.botao-compra');
            if (botaoCompra) {
                botaoCompra.addEventListener('click', () => {
                    window.location.href = `pagamento.html?id=${produtoId}`;
                });
            }
        } else {
            document.querySelector('.detalhes-produto').innerHTML = '<h2>Produto não encontrado.</h2>';
        }
    }

    // ----------------------------------------------------
    // Funcionalidade da Página de Pagamento
    // ----------------------------------------------------
    const produtoIdPagamento = urlParams.get('id');
    
    if (document.querySelector('.secao-pagamento') && produtoIdPagamento) {
        const produto = produtos[produtoIdPagamento];
        if (produto) {
            document.getElementById('nome-produto-pagamento').textContent = `Produto: ${produto.nome}`;
            document.getElementById('preco-produto-pagamento').textContent = `Valor: ${produto.preco}`;
        } else {
            document.querySelector('.resumo-compra').innerHTML = '<h3>Erro ao carregar o produto.</h3>';
        }

        const formPagamento = document.getElementById('form-pagamento');
        if (formPagamento) {
            formPagamento.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Pagamento processado com sucesso! Você será redirecionado para a página inicial.');
                window.location.href = 'index.html';
            });
        }
    }

    // ----------------------------------------------------
    // Funcionalidade do Modo Noturno (melhorada)
    // ----------------------------------------------------
    const modoNoturnoBtn = document.getElementById('modo-noturno-btn');
    const body = document.body;

    // Função para salvar o estado do modo noturno
    const salvarModoNoturno = (modo) => {
        localStorage.setItem('modo-noturno', modo);
    };

    // Função para carregar o estado do modo noturno
    const carregarModoNoturno = () => {
        const modoSalvo = localStorage.getItem('modo-noturno');
        if (modoSalvo === 'ativado') {
            body.classList.add('modo-noturno');
        }
    };
    
    // Carrega o modo noturno ao iniciar a página
    carregarModoNoturno();

    if (modoNoturnoBtn) {
        modoNoturnoBtn.addEventListener('click', () => {
            body.classList.toggle('modo-noturno');
            if (body.classList.contains('modo-noturno')) {
                salvarModoNoturno('ativado');
            } else {
                salvarModoNoturno('desativado');
            }
        });
    }

    // ----------------------------------------------------
    // Funcionalidade do Formulário de Contato (mantém igual)
    // ----------------------------------------------------
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
            formContato.reset();
        });
    }
});