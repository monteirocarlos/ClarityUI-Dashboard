# Guia de Configuração e Execução do Projeto

## Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:

- Node.js (versão 12.x ou superior)
- npm (normalmente vem com o Node.js)
- Vue CLI (opcional, mas recomendado)

## Instalação

Clone o repositório do projeto:

```bash
git clone [clartyui-dashboaird]
```

Acesse a pasta do projeto:

```bash
cd [clarityui-dashboard]
```

Instale as dependências do projeto:

```bash
npm install
```

## Executando o Projeto

O projeto consiste em duas partes principais: o sistema Vue.js e a API mock com JSON Server.

### 1. Iniciar o Sistema (Frontend)
Execute o seguinte comando para iniciar o servidor de desenvolvimento:

```bash
npm run serve
```

O sistema estará disponível em:
[http://localhost:8081](http://localhost:8081)

### 2. Iniciar a API Mock (Backend)
Em um terminal separado, execute o JSON Server para simular a API:

```bash
npx json-server --watch db.json
```

A API estará disponível em:
[http://localhost:3000/products](http://localhost:3000/products)

## Estrutura do Projeto

```
clartyui-dashboaird/
├── node_modules/  
├── public/  
│   ├── favicon.ico  
│   ├── index.html  
├── src/  
│   ├── assets/  
│   │   ├── img/  
│   │   │   ├── alert.jpg  
│   │   │   ├── arrow.png  
│   │   │   ├── user.jpg  
│   │   │   ├── user.png  
│   │   │   ├── logo.png  
│   ├── components/  
│   │   ├── DeleteModal.vue  
│   │   ├── EditModal.vue  
│   ├── router/  
│   │   ├── index.js  
│   ├── services/  
│   │   ├── api.js  
│   │   ├── fakeApi.js  
│   ├── store/  
│   │   ├── index.js  
│   ├── views/  
│   │   ├── Dashboard.vue  
│   ├── App.vue  
│   ├── main.js  
├── .browserslistrc  
├── .eslintrc.js  
├── .gitignore  
├── babel.config.js  
├── db.json  
├── jsonconfig.json  
├── package-lock.json  
├── package.json  
├── README.md  
├── vue.config.js  
```
