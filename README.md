# OndePassa

## Integrantes:
- Henrique de Castro Pereira - 2040482422035
- Leticia Almeida Silva - 2040482422026

## Como executar:
## Backend
- Certifique-se de ter o Node.js instalado, em seguida, entre na pasta **backend** e instale os pacotes: **express**, **dotenv**, **axios** e **cors**.

```bash
cd backend
npm install express dotenv axios cors
```

- Crie os arquivos chamados **'.env'** com o conteúdo **TMDB_TOKEN=** e coloque seu token do The Movie Database. Para criar uma conta, acesse https://www.themoviedb.org/ e confirme o e-mail. Nas configurações da conta, abra a seção API solicite uma chave para uso pessoal e não comercial e preencha o formulário. Cole o token no arquivo .env e inicie o servidor com o comando abaixo:

```bash
npm run dev
```

Para testar o backend, abra **http://localhost:3000**

## Aplicativo
- Abra outro terminal na pasta **mobile** e instale as dependências:

```bash
npm install 
```

- Abra o arquivo **backendClient.js** em **/src/utils** e troque o localhost pelo seu IP do seu computador. Abra o terminal e descubra seu IP através do comando **ipconfig**.

```bash
baseURL: 'http://{SEU_IP}:3000/'
```

- Baixe o aplicativo Expo Go no seu celular e crie uma conta. Para abrir o aplicativo, ambos o celular e computador precisam estar na mesma rede. No terminal, digite o comando abaixo:

```bash
npx expo login
```

- Coloque o seu e-mail/usuário e senha. Após isso, digite:

```bash
npx expo start
```

- Escaneie o QR Code informado no terminal e aproveite!