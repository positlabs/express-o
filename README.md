# k-plus
IT'S GOT WHAT PLANTS CRAVE!

## Development

### CLI Tools

	- Install [NodeJS](https://nodejs.org/en/) LTS version, and update package.json's engines field if necessary

	- Install [PM2](https://github.com/Unitech/pm2). This allows us to edit server files and automatically restart the server to pick up new changes. Also keeps logs organized, and can run in the background.

### Setup

	`npm install`: install node_modules

### Local server

	`npm run start-local`: start a dev server on localhost:3000, and show logs

	Edit local server config in ./dev/env/local.json