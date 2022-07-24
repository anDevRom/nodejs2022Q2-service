# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Nest cli
```console
npm i -g @nestjs/cli
```
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/)

## Downloading

```
git clone https://github.com/anDevRom/nodejs2022Q2-service
```

## Installing NPM modules

- Change branch to task-7
- Install dependencies
```
npm install
```

## Running application

```
docker compose up
```

### Migrations run automatically

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

## Linter errors check

```
npm run lint
```

## Vulnerabilities script

```
npm run image:scan
```

## Images repository on Docker Hub

- [Apps images](https://hub.docker.com/repository/docker/andevrom/nodejs2022q-service)