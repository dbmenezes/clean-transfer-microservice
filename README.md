<h1 align="center">Clean Architecture Transfer Microservice</h1>


## Abordagem
Mudei um pouco a abordagem para uma forma que acredito que fica melhor.
Descrição: 
O fluxo consiste dois microserviços , o de Transferência e o de Liquidação, o de transfêrencia tem uma porta de acesso externa ( API recebendo POST e GET ) , um PRODUCER para solicitar a liquidação e um CONSUMER para atualizar o status de uma transfência.
O serviço de liquidação recebe a solicitação de liquidez por um consumer, realiza as operações e devolve uma resposta com status atualizado para o tópico de LIQUIDATE_UPDATED
O serviço de transfência recebe o status atualizado pelo consumer LIQUIDATE_UPDATED, e atualiza a situação da transfência no banco de dados
Toda logica do MOCK de liquidação está na classe mock-consumer.ts ( que basicamente recebe o pedido de liquidez, e responde o evento no topico LIQUIDATE_UPDATED com um status aleatorio)


## Arquitetura
Optei por utilizar a arquitetura CLEAN, acredito que projetos com DOMÍNIO e regras de negócio sensíveis precisem de uma arquitetura mais robusta.
A aplicação é composta por 6 camadas:

Application- implementações das regras de negócio
Domain- regras de negócio
Infra- Componentes usados pelo sistema ( banco de daos, validações, file system,etc)
Main - adatapers e composers
presentation - visualização de dados, entrada de dados (controllers e adapters)
validation- regras de negócio de validação

Nessa arquitetura as camadas de Application, Domain e Validation estão completamente abstratas de qualquer biblioteca de terceiros, então independente de qualquer mudança, o CORE da aplicação poderá ser reutilizado para sempre.


## Design Patterns,SOLID e boas práticas
Design patterns utilizados no projeto:
- [x] Factory
- [x] Adapter
- [x] Composite

Todos casos de uso e controllers estão com Factorys, isolando a resposanbilidade para montar as dependencias em um único lugar e facilitando refatoramento no futuro.
Adapter utilizado para abstrair dependencia de terceiros
Composite utilizado para criar um composição de validações

SOLID:
classes e funções com responsabilidades únicas e definidas por négocio (CRIAR TRANSFERENCIA,VISUALIZAR TRANSFERENCIA,ATUALIZAR TRANSFERENCIA), inversões de dependencia garantidas com as abstrações.


### Pré-requisitos para rodar o projeto

Para rodar o projeto é necessário ter instalado

- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)


### Rodando o projeto

Toda infra do projeto está configurada no docker-compose.yml, os comandos para rodar se encontram no script sh ( build.sh) para rodar bastar rodar ele com ./build.sh
ou rodar os comandos
npm run build
docker-compose up

a API de referencia estará rodando no endereço http://localhost:5050



##  Documentação API

### POST - Criação de uma transferência
http://localhost:5050/transfer

**Request**

```json
{
  "amount": 15.30,
  "originAccountId": "ffasda21-806d-4580-321d-ac8eff473e2c",
  "destinationAccountId": "ha234axt13-55asqw-1231-dddas-gafsa1231x",
  "due_date": "07/03/2022 20:20"
}
```
> Parametro due date é opcional, tem que ser passado no formato dd/MM/yyyy HH:mm, formato usado para validar se pode fazer a liquidação da trasnferência

**Response**

```json
{
    "message": "Transfer with ID f1f043df-d790-4e16-8e95-33d6896f94ed successfuly created"
}
```


### GET - Consulta de uma transferência

http://localhost:5050/transfer/:internalId

**Response**

```json
{
    "originAccountId": "312",
    "destinationAccountId": "5",
    "dueDate": "07/03/2022 20:20",
    "internalId": "f1f043df-d790-4e16-8e95-33d6896f94ed",
    "status": "rejected",
    "createdAt": "2022-03-07T11:59:59.831Z",
    "updatedAt": "2022-03-07T11:59:59.852Z",
    "expectedOn": "07/03/2022 11:59",
    "externalId": "fdc6aa7d-daa8-4515-bacf-2ccd00494316"
}
```

### Testes
Controllers e adapters 100% testados com jest!
(https://user-images.githubusercontent.com/11543191/157031251-70ec0f8b-cea2-4cda-9f18-f91ad345deb6.PNG)

Qualquer dúvida meu email é danielbezerrakmx@gmail.com.

