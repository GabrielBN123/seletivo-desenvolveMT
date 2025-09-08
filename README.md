# 🚀 Projeto Prático - React + TypeScript + Vite

## 📊 Informações do Candidato

- **Nome:** Gabriel Batista da Silva Nogueira  
- **CPF:** 07613004147  
- **E-mail:** gabrielbdsn12@hotmail.com  

Este é um projeto prático desenvolvido para o processo seletivo **DesenvolveMT**.  

Proprietário: **Gabriel Batista**

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

### 1) Clonar o repositório

```bash
git clone https://github.com/GabrielBN123/seletivo-desenvolveMT.git
cd seletivo-desenvolveMT
```

---

### 2) Rodar com Docker (recomendado - produção)

Pré-requisitos: Docker e Docker Compose instalados.  

#### Usando Docker Compose
```bash
docker compose build
docker compose up -d
```
Acesse em: **http://localhost:8080**

- Parar containers: `docker compose down`  
- Rebuild sem cache: `docker compose build --no-cache && docker compose up -d`  
- Logs: `docker compose logs -f`  

#### Usando Docker puro
1. Construir imagem:  
```bash
docker build -t desenvolve-mt .
```
2. Rodar container:  
```bash
docker run -d -p 8080:80 --name desenvolve-mt desenvolve-mt
```
3. Acessar: **http://localhost:8080**  
4. Parar/remover:  
```bash
docker stop desenvolve-mt && docker rm desenvolve-mt
```

---

### 3) Rodar localmente (alternativo - desenvolvimento)

Instalar dependências:  
```bash
npm install
# ou
yarn install
```

Rodar servidor de desenvolvimento:  
```bash
npm run dev
# ou
yarn dev
```

Acesse em: **http://localhost:5173/**

---

## 📦 Scripts Disponíveis

- `dev` → Roda o servidor de desenvolvimento  
- `build` → Gera a versão de produção  
- `preview` → Faz o preview da build de produção  

---

## 👨‍💻 Autor

Desenvolvido por **Gabriel Batista**  
📧 [gabrielbdsn12@hotmail.com]  
🌐 [LinkedIn](https://www.linkedin.com/in/gabriel-batista-da-silva-nogueira-03b1b7157/) • [GitHub](https://github.com/GabrielBN123)

---

## 📝 Licença

Este projeto é de uso livre para estudo e prática.  
