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

- Change branch to task-8/authentication
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

To run all tests with authorization

```
npm run test:auth
```

To run only one of all test suites

```
npm run test:auth -- <path to suite>
```

## Linter errors check

```
npm run lint
```

## Logging

Log files stored in logs directory

Types of log file:
- http_log (OK responses)
- http_error (ERROR responses)
- app_error (Internal server errors)

Env variables:
```
LOGGING_LEVEL=1 // log
LOGGING_LEVEL=2 // log, error
LOGGING_LEVEL=3 // log, error, warn

LOGGING_FILE_SIZE // max size of log file
```

