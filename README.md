## Como Executar o Projeto?

Este projeto é **100% containerizado com Docker**, então a configuração e execução são muito simples.

### 1. Pré-requisitos

Antes de começar, garanta que você tem o seguinte software instalado na sua máquina:

- **Git:** Para clonar o repositório.
- **Docker e Docker Compose:** Para construir e orquestrar todos os serviços.

### 2. Clonar o Repositório

Abra um terminal e execute os comandos abaixo:

```bash
# Clone este repositório
git clone https://github.com/maluvasc/runge-kutta-method-circuit.git

# Entre na pasta do projeto
cd runge-kutta-method-circuit
```
---

### 3. Construir e Executar a Aplicação

Com tudo configurado, basta um único comando para construir e iniciar todos os serviços do projeto.

> 💡 Certifique-se de que o Docker Desktop está rodando!

No terminal, na raiz do projeto, execute:

```bash
docker compose up --build
```

Este comando pode levar alguns minutos na primeira vez, pois irá baixar imagens e construir os três módulos da aplicação.

---

### Verificando se Tudo Funcionou

Assim que os logs no terminal se estabilizarem, sua aplicação estará pronta:

- **Frontend**:  
 [http://localhost:5173](http://localhost:5173)

---

### Como Parar a Aplicação?

Para desligar todos os serviços:

1. Vá até o terminal onde o `docker compose up` está rodando.
2. Pressione `Ctrl + C`.

Se quiser parar completamente e remover os containers criados, você pode rodar:

```bash
docker compose down
```

---
