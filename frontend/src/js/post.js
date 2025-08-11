const form = document.getElementById("post_movie_form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const genero = document.getElementById("genero").value.trim();
    const imagem_url = document.getElementById("imagem_url").value.trim();
    const gostei = 0;
    const nao_gostei = 0;

    if (nome && genero && imagem_url) {
        fetch('http://localhost:3000/POSTfilmes', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, descricao, gostei, nao_gostei, genero, imagem_url, })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Sucesso:", data);
            alert(`Filme "${nome}" cadastrado!`);
            form.reset(); // Limpa o formulário após o envio
            window.location.href = 'index.html';
        })
        .catch(error => console.error("Erro:", error));
    } else {
        alert("Há algum(uns) campo(s) vazio(s)!");
    }
})
