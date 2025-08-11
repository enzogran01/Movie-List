const express = require("express");
const mysql = require("mysql2");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

PORT = 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "filmes"
})

db.connect((err) => {
    if (err) {
        console.log("Erro ao conectar ao MySQL: ", err.cause);
        return;
    }
    console.log("Conectado ao MySQL");
})

// Rota para consulta
app.get("/GETfilmes", (req, res) => {
    const sql = "SELECT * FROM filme";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao buscar filmes" });
        }
        return res.status(200).json(results);
    })
})

// Rota para inserção
app.post("/POSTfilmes", (req, res) => {
    const { nome, descricao, gostei, nao_gostei, imagem_url, genero } = req.body;
    const sql = `INSERT INTO filme (nome, descricao, gostei, nao_gostei, imagem_url, genero) VALUES (?, ?, ?, ?, ?, ?)`

    db.query(sql, [nome, descricao, gostei, nao_gostei, imagem_url, genero], (err, result) => {
        if (err) {
            return res.status(501).json({ erro: "Erro ao inserir filme" });
        }
        res.status(201).json({ mensagem: `Filme "${nome}" inserido com sucesso` });
    })
})

// Rota para deleção
app.delete("/DELETEfilmes", (req, res) => {
    const { id } = req.body;
    const sql = "DELETE FROM filme WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(502).json({ erro: "Erro ao inserir filme" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: "Filme não encontrado" });
        }
        res.status(202).json({ mensagem: `Filme "${id}" deletado com sucesso` });
    })
})

app.patch("/PATCHfilmesLIKE", (req, res) => {
    const { nome } = req.body;
    const sql = "UPDATE filme SET gostei = gostei + 1 WHERE nome = ?";
    db.query(sql, [nome], (err, result) => {
        if (err) {
            return res.status(503).json({ erro: "Erro ao dar like no filme" });
        }
        res.status(203).json({ mensagem: `Filme "${nome}" recebeu 1 like com sucesso`});
    })
})

app.patch("/PATCHfilmesDISLIKE", (req, res) => {
    const { nome } = req.body;
    const sql = "UPDATE filme SET nao_gostei = nao_gostei + 1 WHERE nome = ?";
    db.query(sql, [nome], (err, result) => {
        if (err) {
            return res.status(503).json({ erro: "Erro ao dar dislike no filme" });
        }
        res.status(203).json({ mensagem: `Filme "${nome}" recebeu 1 dislike com sucesso`});
    })
})

app.get("/totalVotos", (req, res) => {
    const sql = `
        SELECT 
            SUM(gostei) AS total_likes,
            SUM(nao_gostei) AS total_dislikes 
        FROM filme
    `;
    
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ erro: "Erro ao calcular votos" });
        }
        res.status(200).json({ mensagem: result });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

/*
    API de Filmes

    - Listar filmes
    - Adicionar filmes
    - Excluir filmes
    - Dar like ou dislike nos filmes
*/
