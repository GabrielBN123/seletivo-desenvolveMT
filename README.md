# 🚀 Projeto Prático - React + TypeScript + Vite

## 📊 Informações do Candidato

- **Nome:** Gabriel Batista da Silva Nogueira
- **CPF:** 07613004147
- **E-mail:** gabrielbdsn12@hotmail.com

Este é um projeto prático desenvolvido para o processo seletivo DesenvolveMT.

Proprietário: Gabriel Batista
---

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Vite](https://vitejs.dev/)  
- [ESLint](https://eslint.org/)  
- [Nginx](https://nginx.org/)  
- [Docker](https://www.docker.com/)  

---

## 📂 Estrutura do Projeto

```bash
.
├── public/         # Arquivos estáticos
├── src/            # Código-fonte da aplicação
│   ├── assets/     # Imagens e outros arquivos
│   ├── components/ # Componentes reutilizáveis
│   ├── pages/      # Páginas da aplicação
│   ├── services/   # Utilização da API
│   ├── routes/     # Rotas da aplicação
│   └── App.tsx     # Componente principal
├── dist/           # Build de produção (gerada por npm run build e usada no Docker)
├── index.html      # HTML principal
├── Dockerfile      # Imagem Nginx que serve o conteúdo de dist/
├── nginx.conf      # Configuração Nginx para SPA (history fallback)
└── package.json    # Dependências e scripts
```

---

## ⚙️ Como Rodar

Você pode rodar a aplicação de duas formas: via Docker (produção) ou localmente com Vite (desenvolvimento).

### 1) Rodar com Docker (produção)

Pré-requisitos: Docker e Docker Compose instalados e em execução.

Construir e subir os containers:

```bash
docker compose build
docker compose up -d
```

Acesse no navegador: **http://localhost:8080**

Parar e remover containers/recursos criados pelo Compose:

```bash
docker compose down
```

Rebuild sem cache (útil após mudanças):

```bash
docker compose build --no-cache && docker compose up -d
```

### 2) Rodar localmente (desenvolvimento)

Clone o repositório:

```bash
git clone https://github.com/GabrielBN123/seletivo-desenvolveMT.git
```

Acesse a pasta do projeto:

```bash
cd seletivo-desenvolveMT
```

Instale as dependências:

```bash
npm install
# ou
yarn install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Acesse no navegador: **http://localhost:5173/**

---

## 📦 Scripts Disponíveis

- `dev` → Roda o servidor de desenvolvimento  
- `build` → Gera a versão de produção  
- `preview` → Faz o preview da build de produção  

---

## 🐳 Docker

A imagem é construída via multi-stage (Node para build e Nginx para servir). O `docker-compose.yml` já executa todo o processo de build e sobe um container Nginx servindo a pasta `dist/`.

### Usando Docker Compose (recomendado)

- Subir: `docker compose up -d`
- Acessar: `http://localhost:8080`
- Logs: `docker compose logs -f`
- Reiniciar: `docker compose restart`
- Parar/remover: `docker compose down`
- Rebuild sem cache: `docker compose build --no-cache && docker compose up -d`

### Usando Docker puro (alternativo)

1) Construir a imagem:
```bash
docker build -t desenvolve-mt .
```

2) Rodar o container:
```bash
docker run -d -p 8080:80 --name desenvolve-mt desenvolve-mt
```

3) Acessar: `http://localhost:8080`

4) Parar e remover:
```bash
docker stop desenvolve-mt && docker rm desenvolve-mt
```

### Dicas e limpeza de recursos Docker

- Remover recursos não utilizados (cuidado, operação destrutiva):
```bash
docker system prune -f
# Para também remover imagens não referenciadas por nenhum container:
docker system prune -a -f
```

- Remover volumes não utilizados:
```bash
docker volume prune -f
```

- Ver containers em execução: `docker ps`
- Ver todas as imagens: `docker images`

No Windows (PowerShell), os comandos acima funcionam normalmente.

---

## 👨‍💻 Autor

Desenvolvido por **Gabriel Batista**  
📧 [gabrielbdsn12@hotmail.com]  
🌐 [LinkedIn](https://www.linkedin.com/in/gabriel-batista-da-silva-nogueira-03b1b7157/) • [GitHub](https://github.com/GabrielBN123)

---

## 📝 Licença

Este projeto é de uso livre para estudo e prática.  
Sinta-se à vontade para clonar e modificar.
