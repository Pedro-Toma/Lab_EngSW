# 📋 FoodWise - Sistema de Gestão para Restaurantes

Solução Full-Stack para gestão inteligente de restaurantes: integra controle financeiro e combate ao desperdício com uma vitrine digital para o público final

## 🎥 Vídeo de Apresentação
[![Ver Vídeo de Apresentação](https://img.youtube.com/vi/ZObD4cjvcZg/0.jpg)](https://www.youtube.com/watch?v=ZObD4cjvcZg)  
*Clique na imagem para ver a demonstração em vídeo*

## 👥 Integrantes do Projeto

* Diogo Cornélio Martins Rosa
* Eduardo Honorio Friaca
* Felipe Jiao
* Gabriel Fuentes de Freitas Yamashita
* Pedro Akira Cardoso Toma

## 🔎 Sobre o Projeto

O **FoodWise** é uma plataforma que permite a gerentes de restaurantes analisarem a saúde do negócio em tempo real. O sistema foca em quatro pilares fundamentais:
* **Monitoramento de Desperdício**: Controle rigoroso para reduzir perdas.
* **Gestão Financeira**: Visualização clara de receitas e despesas.
* **Transparência**: Divulgação de índices de sustentabilidade e cardápio para o público final.
* **Relatórios Mensais**: Compilação de dados históricos operacionais e financeiros para análise de tendências e tomada de decisão estratégica.

## 🧱 Estrutura do Projeto

* **Bibliotecas Necessárias (frontend)**: As bibliotecas (dependências) para o desenvolvimento do frontend estão localizadas no arquivo [package.json](https://github.com/Pedro-Toma/Lab_EngSW/blob/main/projetoFoodWise/frontend/package.json) com as versões em [package-lock.json](https://github.com/Pedro-Toma/Lab_EngSW/blob/main/projetoFoodWise/frontend/package-lock.json).
* **Bibliotecas Necessárias (backend)**: As bibliotecas utilizadas para o desenvolvimento do backend estão localizadas no arquivo [/backend/requirements.txt](https://github.com/Pedro-Toma/Lab_EngSW/blob/main/projetoFoodWise/backend/requirements.txt).
* **Frontend**: Foi organizado em [páginas](https://github.com/Pedro-Toma/Lab_EngSW/tree/main/projetoFoodWise/frontend/src/pages) com a reutilização de diversos [componentes](https://github.com/Pedro-Toma/Lab_EngSW/tree/main/projetoFoodWise/frontend/src/components) (modularização). Além disso, foi utilizado o React Router para evitar o reload da página inteira durante a navegação e o Vite como ferramenta de build para desenvolvimento local. 
* **Estilização do Frontend**: As imagens (ícones) fixas do site foram armazenadas na pasta [assets](https://github.com/Pedro-Toma/Lab_EngSW/tree/main/projetoFoodWise/frontend/src/assets) e a estilização e organização dos elementos foram feitas dentro do arquivo central [index.css](https://github.com/Pedro-Toma/Lab_EngSW/blob/main/projetoFoodWise/frontend/src/index.css) com comentários segmentando componentes de cada página.
* **Backend**: A criptografia das senhas dos usuários e a criação de tokens JWT para gerenciar sessões estão localizadas no arquivo [auth.py](https://github.com/Pedro-Toma/Lab_EngSW/blob/main/projetoFoodWise/backend/auth.py), enquanto que os endpoints da API REST para comunicação com o frontend estão localizados no arquivo [main.py](https://github.com/Pedro-Toma/Lab_EngSW/blob/main/projetoFoodWise/backend/main.py). Os arquivos relacionados ao banco de dados são os seguintes:
  * [database.py](https://github.com/Pedro-Toma/Lab_EngSW/blob/main/projetoFoodWise/backend/database.py): Gerencia a conexão com o banco de dados MySQL hospedado na AWS e cria sessão local.
  * [models.py](https://github.com/Pedro-Toma/Lab_EngSW/blob/main/projetoFoodWise/backend/models.py): Definição do formato das tabelas e tipos de dados armazenados no BD (banco de dados).
  * [schemas.py](https://github.com/Pedro-Toma/Lab_EngSW/blob/main/projetoFoodWise/backend/schemas.py): Formatação dos dados de entrada e saída do backend, para enviar apenas os dados necessários (Data Transfer Objects).

## 💻 Tecnologias Utilizadas

* **Frontend**: React, Vite, Recharts.
* **Backend**: Python, FastAPI, SQLAlchemy.
* **Banco de Dados**: MySQL.

## 🔧 Como Rodar o Projeto Localmente

**Nota Importante:** O banco de dados original (AWS EC2) foi desativado, pois foi feito em uma conta acadêmica temporária.
Atualmente, o Backend serve primariamente para análise de código e arquitetura.
Para rodar a aplicação com funcionalidade completa, é necessário configurar uma instância local do MySQL e atualizar a string de conexão em `database.py`.

### 1. Clonar o Repositório
```
git clone https://github.com/Pedro-Toma/Lab_EngSW.git
cd Lab_EngSW/projetoFoodWise
```

### 2. Visualizar o Frontend (Acesse em: http://localhost:5173)
#### Instale Dependências
```
cd frontend
npm install
```

#### Execute o Frontend
```
npm run dev
```
Observação: Sem o backend ativo, as tentativas de Login ou carregamento de gráficos retornarão erros, mas a interface estática permanecerá visível.

### 3. Caso tenha criado um banco de dados e atualizado as informações em database.py para conexão

#### Crie o ambiente virtual
```
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate
```

#### Instale dependências
```
pip install -r requirements.txt
```

#### Execute o servidor
```
python main.py
```
