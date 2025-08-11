document.addEventListener('DOMContentLoaded', function() {
    const catalogo = document.getElementById('catalogo');

    async function carregarFilmes() {
        try {
            const response = await fetch('http://localhost:3000/GETfilmes');
            if (!response.ok) {
                throw new Error('Erro ao carregar filmes');
            }
            const filmes = await response.json();
            exibirFilmes(filmes);
        } catch (error) {
            console.error('Erro:', error);
            catalogo.innerHTML = '<p class="erro">Erro ao carregar filmes. Recarregue a página.</p>';
        }
    }

    function exibirFilmes(filmes) {
        catalogo.innerHTML = '';

        filmes.forEach(filme => {
            const article = document.createElement('article');
            article.className = 'filme';
            
            article.innerHTML = `
                <img src="${filme.imagem_url || 'https://cdn2.unrealengine.com/fortnite-blitz-royale-1920x1080-9946411a3a9f.jpg'}" alt="${filme.nome}">
                <h2>${filme.nome}</h2>
                <span class="genero">${filme.genero ? filme.genero : 'SEM GÊNERO'}</span>
                <p>${filme.descricao || 'Descrição não disponível'}</p>
                <div class="votos_filme">
                    <button class="votos_filme-positivo" onclick="darLikeFilme('${filme.nome}')">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/></svg>
                        ${filme.gostei || 0}
                    </button>
                    <button class="votos_filme-negativo" onclick="darDislikeFilme('${filme.nome}')">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z"/></svg>    
                        ${filme.nao_gostei || 0}
                    </button>
                </div>
            `;
            
            catalogo.appendChild(article);
        });
    }

    carregarFilmes();
    atualizarContadores();
});

function darLikeFilme(nome) {
    fetch('http://localhost:3000/PATCHfilmesLIKE', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome })
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function darDislikeFilme(nome) {
    fetch('http://localhost:3000/PATCHfilmesDISLIKE', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome })
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

function atualizarContadores() {
    fetch('http://localhost:3000/totalVotos')
        .then(response => response.json())
        .then(data => {
            document.querySelector('.total-likes').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/></svg>${data.mensagem[0].total_likes || 0}`;
            document.querySelector('.total-dislikes').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z"/></svg>${data.mensagem[0].total_dislikes || 0}`;
        })
        .catch(error => console.error('Erro:', error));
}
