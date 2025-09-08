# 🚀 Projeto Prático - React + TypeScript + Vite

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

Você pode rodar a aplicação de duas formas: localmente (Vite dev server) ou via Docker (Nginx servindo a build de produção).

### Rodar localmente (desenvolvimento)

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

Pré-requisitos: Docker instalado e em execução.

O `Dockerfile` utiliza uma etapa única do Nginx e copia a pasta `dist/` para dentro da imagem. Portanto, é necessário gerar a build localmente antes de construir a imagem.

1) Gerar a build de produção do frontend:

```bash
npm run build
```

2) (Opcional, recomendado) Limpar imagens/containers antes de criar uma nova imagem

ATENÇÃO: os comandos abaixo removem containers, imagens, redes e volumes NÃO utilizados. Se quiser realmente começar do zero, use o último comando (mais agressivo). Execute em PowerShell:

```powershell
# Parar e remover todos os containers (se houver)
docker ps -aq | ForEach-Object { docker stop $_ }
docker ps -aq | ForEach-Object { docker rm $_ }

# Remover imagens não utilizadas (todas as não usadas por nenhum container)
docker system prune -a -f

# (Opcional) também remover volumes não utilizados
docker volume prune -f
```

3) Construir a imagem Docker:

```bash
docker build -t desenvolve-mt .
```

4) Rodar o container:

```bash
docker run -d -p 8080:80 --name desenvolve-mt desenvolve-mt
```

5) Acessar no navegador: http://localhost:8080

Rebuild após mudanças no código:

```bash
npm run build && docker build --no-cache -t desenvolve-mt . && docker stop desenvolve-mt && docker rm desenvolve-mt && docker run -d -p 8080:80 --name desenvolve-mt desenvolve-mt
```

Para parar e remover o container:

```bash
docker stop desenvolve-mt && docker rm desenvolve-mt
```

---

## 👨‍💻 Autor

Desenvolvido por **Gabriel Batista**  
📧 [gabrielbdsn12@hotmail.com]  
🌐 [LinkedIn](https://www.linkedin.com/in/gabriel-batista-da-silva-nogueira-03b1b7157/) • [GitHub](https://github.com/GabrielBN123)

---

## 📝 Licença

Este projeto é de uso livre para estudo e prática.  
Sinta-se à vontade para clonar e modificar.
