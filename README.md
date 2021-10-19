# Heartsight
## About
Web application for Heartsight used by doctors for diagnostic imaging of electro-cardiogram data.

# Development
## Prerequisite Software
### Node
[Node.js](https://nodejs.org)

This repo runs on Node 14. You can check your version of node with node -v.

#### NVM (Optional)

[Node Version Manager (NVM)](https://github.com/nvm-sh/nvm)

NVM is useful for managing different versions of Node.js.

If possible, it's good to set up an `.nvmrc` and to run `nvm use` in every new terminal you open to use with `FIT3170-webapp` so you always run the correct version of Node.

### Yarn

[Yarn](https://classic.yarnpkg.com)

Make sure that Yarn is installed with version >= `1.22.0`.

### NPM packages
The packages required to compile and run this software is listed in `package.json`. This can be installed in the Development step.

## Setup

Clone the `FIT3170-webapp` repository to your machine.

[https://github.com/nchong128/FIT3170-webapp]()

```sh
git clone git@github.com:nchong128/FIT3170-webapp.git
```

Install dependencies with yarn

```sh
yarn install
```
### Firebase
You will need to add these keys to your `.env` file. This can be found in the Firebase console.
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGE_SENDER_ID= 
REACT_APP_APP_ID=
```

### Starting
Start the web application. Hot reload is on so there is no need to restart the server unless a critical error occurs.
```
yarn start
```

# Deployment
Build the web application
```
yarn predeploy
```

Deploy the application to Github Pages
```
yarn deploy
```
