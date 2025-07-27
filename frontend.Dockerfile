# Arquivo: frontend.Dockerfile (na raiz do projeto)
# Este é o manual para construir a imagem do seu front-end React.

# 1. Imagem Base
FROM node:20-alpine

# 2. Diretório de Trabalho
WORKDIR /app

# 3. Copie e Instale as Dependências
COPY package*.json ./
RUN npm install

# 4. Copie o Código da Aplicação
# Copia o resto dos arquivos da raiz para o contêiner
COPY . .

# 5. Exponha a Porta do Vite
EXPOSE 5173

# 6. Comando de Execução
# Inicia o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev", "--", "--host"]
    