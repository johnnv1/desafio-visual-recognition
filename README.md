# Bluegame: Desafio Visual Recognition
Este é o segundo desafio do bluegame, cada vez o seu alienware está mais próximo. Leia atentamente as instruções abaixo e boa sorte!

## Passo a Passo

1. Vocé precisará de uma conta na IBM Cloud. Caso ainda não tenha, corra e crie logo a sua clicando [aqui][sign_up].

2. Baixe e instale a ferramenta [Cloud-foundry CLI][cloud_foundry], caso ainda não tenha feito.

3. Faça um fork deste projeto e clone (o fork que você acabou de criar) para sua máquina.

4. Crie o serviço Visual Recognition (Free) em sua conta clicando [aqui][vr-link]. Permaneça na página para qual foi direcionado após a criação do serviço.

5. Clique em `Service credentials`, agora clique em New Credential (o botão azul que fica do lado direito da página). Após aparecer a modal de criação (modal com título Add new credential), apenas clique em `Add`.

6. Uma vez criada a credencial, clique na action `View credentials`. Copie o JSON gerado para um arquivo temporário, logo iremos usá-lo.

7. Ainda na mesma página, volte para a sessão `Manage`.

8. Clique em `Visual Recognition Tool (Beta)`. Caso abra uma tela de login, clique em `Log in with IBM ID`.

9. Lembra do arquivo temporário contendo o JSON que você acabou criar? Copie o valor da chave `api_key`, clique no botão roxo onde está escrito "API Key" e cole. Pronto agora iremos criar nosso classificador. Detalhe muito importante, é pedido um tempo de aproximadamente 5 minutos para que sua nova api key seja ativada, deste modo apenas aguarde um momento para conseguir prosseguir.

10. Para este desafio usaremos Star Wars como tema, para isso você irá precisar de pelo menos 10 imagens dos seguintes personagens:
  - `Darth Vader`
  - `Luke Skywalker`
  - `Chewbacca`
  - `Leia Organa`
  - `Yoda`

11. Esse passo é opcional mas pode melhorar seu classificador. Pesquise por imagens que sejam parecidas com as dos personagens do `passo 10` mas não sejam eles de fato. Por exemplo, um cachorro que pareça o Chewbacca.

12. Agora que já tem as imagens crie um arquivo `zip` para cada personagem, por exemplo `Yoda.zip`. Caso tenha efetuado o passo 11, crie um `zip` contendo todas as imagens encontradas (imagens parecidas com as dos personagens, mas que não sejam eles de fato).

13. Clique em `Create classifier` e escolha um nome para seu classificador.

14. Precisamos criar uma classe para cada personagem. Crie as seguintes classes (para adicionar mais boxes clique no botão `Add Class` que está no cando inferior esquerdo):
    - `Darth Vader`
    - `Luke Skywalker`
    - `Chewbacca`
    - `Leia Organa`
    - `Yoda`

15. Agore iremos fazer o upload de cada arquivo zip criado no `passo 12` para a IBM Cloud. Note que o nome da classe que criamos é idêntico ao nome dos personagens, desta forma faça o upload do arquivo zip de cada personagem para sua respectiva classe e clique em `Create`. Caso tenha feito o passo `11`, faça o upload do arquivo zip contendo todas a imagens similares para a classe `Negative` que é mostrada na tela e clique em `Create`.

16. Após criado seu classificador, será mostrado na tela que ele esta em processo de `training`. Quando este mudar para `ready`, prossiga para o passo `17`.

17. Precisamos agora copiar o identificador do seu classificador que é gerado a patir do nome que você escolheu. Por exemplo, se escolheu `Star Wars` como nome para seu clasificador, o id gerado será algo como `StarWars_1234567890`. Ele é mostrado na box do seu classificador em cinza, logo abaixo do nome do classificador. Copie o valor do identificador para o arquivo temporário que criamos no passo `6`.

18. Crie um arquivo chamado `.env` no diretório root do repo clonado, usando o arquivo `env.sample` como template, usando o comando:

  ```none
  cp env.sample .env
  ```

O arquivo `.env` deve conter, em um primeiro momento, o seguinte conteúdo:

  ```none
      VR_API_KEY=
      VR_CLASSIFIER_ID=
  ```

19. Lembra do arquivo temporário? Agora iremos usá-lo. Copie o valor de `api_key`, e do identificador que adicionamos no arquivo no passo `17` para as respectivas variáveis `VR_API_KEY` e `VR_CLASSIFIER_ID` no arquivo `.env`.
Agora o arquivo `.env` deverá estar assim:

  ```none
    VR_API_KEY=<VALOR de api_key COPIADO SEM ÁSPAS>
    VR_CLASSIFIER_ID=<IDENTIFICADOR DO CLASSIFICADOR>
  ```

20. Estamos quase lá. Agora e dite o arquivo `manifest.yml` e mude `<sua-id>` para que seja a mesma id que você recebeu em seu email de inscrição. Esse passo é muito importante para posterior validação de seu desafio.
  ```yaml
  ---
applications:
    - name: <sua-id>-visualrecognition
      path: .
      memory: 256M
      instances: 1
      buildpack: sdk-for-nodejs
      route: mybluemix.net
      command: npm start
      disk_quota: 1024M
  ```

21. A partir de agora você precisa instalar (caso ainda não tenha) o NodeJS e o geranciador de pacotes NPM. Siga as instruções disponíveis em https://docs.npmjs.com/getting-started/installing-node. Detalhe muito importante, você precisa pelo menos da versão 8.9.4 do node.

22. Com tudo instalado. Execute o seguinte comando para instalar as dependências do projeto:

  ```none
  npm install
  ```

23. Para executar a aplicação localmente execute o comando:

  ```none
  npm run dev
  ```
24. Acesse o endereço [http://localhost:8080](http://localhsot:8080).

25. Para testar sua applicação, envie uma das imagens que usou no classificador e verifique se a resposta está correta, caso não esteja, verifique se efetuou corretamente o passo `15`.

26. Precisamos agora logar na IBM Cloud, para isto execute o seguinte comando.
```none
cf api https://api.ng.bluemix.net
cf login
```

27. Após feito o login, execute o seguinte comando para fazer o deploy de sua aplicação.
```sh
    npm run build && cf push
```
28. Veja que legal, você consiguiu terminar o desafio, agora acesse a página do [bluegame][page-link] no facebook e diga para o bot: `desafio visual recognition finalizado`.

[sign_up]: https://console.ng.bluemix.net/registration/
[page-link]: https://www.facebook.com/ibmbluegame/
[dashboard-link]: https://console.bluemix.net/dashboard/apps
[vr-link]: https://console.bluemix.net/catalog/services/visual-recognition
[cloud_foundry]: https://github.com/cloudfoundry/cli
