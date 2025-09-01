# aws-web-rds

## Descrição

Este projeto é uma aplicação web simples com frontend HTML e backend Node.js, conectada a um banco de dados PostgreSQL hospedado no Amazon RDS.
O backend fornece uma API para gerenciar contatos, e o frontend consome essa API para exibir os dados ao usuário.

## Demonstração

Prepare um vídeo demonstrando as máquinas/serviços em execução no console da AWS, mostrando:

- Instância EC2 com backend rodando

- Banco RDS funcionando e conectado

- Configuração dos grupos de segurança

- Site acessível via navegador

- Tabela contacts acessada via terminal (psql)

[URL do vídeo](https://drive.google.com/file/d/13COMNpvcTG7lIF3P3QleYYWWNnQfoj7S/view?usp=sharing)

### Estrutura do Projeto

```
aws-web-rds/
│
├─ backend/           # Código Node.js do backend
│  ├─ server.js
│  ├─ models/
│  ├─ routes/
│  ├─ db/
│  ├─ package.json
│  └─ package-lock.json
│
├─ frontend/          # Frontend HTML simples
│  └─ index.html
│
└─ README.md
```

## Tecnologias

* Node.js + Express
* PostgreSQL (RDS)
* Sequelize (ORM)
* Nginx (para servir frontend)
* AWS EC2 (hospedagem backend/frontend)
* AWS RDS (banco de dados)

## Instalação

1. Conecte-se à instância EC2:

```bash
ssh -i sua_chave.pem ubuntu@<IP_EC2>
```

2. Instale dependências do backend:

```bash
cd backend
npm install
```

3. Configure variáveis de ambiente no arquivo `.env`:

```env
DB_HOST=<endpoint_RDS>
DB_PORT=5432
DB_NAME=appdb
DB_USER=postgres
DB_PASS=<senha>
PORT=3000
```

4. Teste a conexão com o RDS:

```bash
node server.js
# Deve mostrar: Conectado ao RDS! Servidor rodando em http://localhost:3000
```

## Deploy

1. Instale PM2 para gerenciar o backend em produção:

```bash
sudo npm install -g pm2
pm2 start server.js --name aws-web-rds
pm2 save
pm2 startup
```

2. Configure Nginx para servir frontend e fazer proxy para backend:

```nginx
server {
    listen 80;
    server_name <IP_EC2>;

    root /home/ubuntu/aws-web-rds/frontend;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. Ative a configuração e reinicie o Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/aws-web-rds /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl daemon-reload
sudo systemctl restart nginx
```

## Banco de Dados

* Tabela `contacts` com 6 campos:

  * `id`: UUID (chave primária)
  * `name`: STRING
  * `email`: STRING
  * `age`: INTEGER
  * `joined_on`: DATE
  * `active`: BOOLEAN

**Exemplo de comando para ver os dados:**

```bash
psql -h <endpoint_RDS> -U postgres -d appdb -p 5432
\dt
\d contacts
SELECT * FROM contacts;
```

## Fluxo da Aplicação

1. Usuário acessa o frontend no navegador.
2. Frontend envia requisições para o backend (`/api/`).
3. Backend consulta o banco RDS e retorna os dados.
4. Frontend exibe os dados ao usuário.

## Observações

* Certifique-se que os grupos de segurança da EC2 e do RDS permitam o acesso às portas 80, 3000 e 5432.
* As permissões de pastas do frontend devem permitir leitura pelo Nginx (`www-data`).