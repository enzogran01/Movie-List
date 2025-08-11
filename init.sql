CREATE SCHEMA filmes;
USE filmes;

CREATE TABLE IF NOT EXISTS filme (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(500),
    gostei SMALLINT NOT NULL DEFAULT 0,
    nao_gostei SMALLINT NOT NULL DEFAULT 0,
    imagem_url VARCHAR(255) NOT NULL,
    genero VARCHAR(50) NOT NULL
);

INSERT INTO filme (id, nome, descricao, gostei, nao_gostei, imagem_url, genero) VALUES
(1, 'Clube da Luta', 'Um homem desiludido forma um clube secreto de luta.', 81, 10, 'https://br.web.img3.acsta.net/medias/nmedia/18/90/95/96/20122166.jpg', 'THRILLER'),
(2, 'Forrest Gump - O Contador de Histórias', 'Mesmo sendo ingênuo, Forrest Gump nunca se sentiu desfavorecido. Graças ao apoio da mãe, ele teve uma vida normal.', 54, 14, 'https://uauposters.com.br/media/catalog/product/3/5/352820210407-uau-posters-forrest-gump-filmes-3.jpg', 'TRAGICOMÉDIA'),
(3, 'A Fuga das Galinhas', 'A história se passa em uma fazenda de galinhas onde as galinhas, lideradas por Ginger, estão constantemente tentando escapar da exploração.', 34, 1, 'https://br.web.img3.acsta.net/medias/nmedia/18/90/46/51/20097751.jpg', 'ANIMAÇÃO'),
(4, 'Pulp Fiction', 'O filme entrelaça várias histórias conectadas envolvendo assassinos, um gângster, sua esposa e um pugilista, explorando temas de violência, redenção e cultura pop.', 23, 2, 'https://m.media-amazon.com/images/I/71e+s01VVJL._UF1000,1000_QL80_.jpg', 'THRILLER'),
(5, 'Jurassic Park', 'A história se passa em uma ilha remota, onde um bilionário cria um parque temático com dinossauros clonados a partir de DNA pré-histórico.', 200, 10, 'https://a-static.mlcdn.com.br/1500x1500/poster-cartaz-jurassic-park-parque-dos-dinossauros-a-pop-arte-poster/poparteskins2/15938514198/de227aaf112c636d5eecfc645cc799ff.jpeg', 'AVENTURA');
