# node-mongo-signup-verification-api

starting point : Jason Watmore's excellent tutorial

NodeJS + MongoDB - API with Email Sign Up, Verification, Authentication & Forgot Password

For documentation and instructions see https://jasonwatmore.com/post/2020/05/13/node-mongo-api-with-email-sign-up-verification-authentication-forgot-password


Added Typescript
Added testing with mocha, chai and sinon
Refactored repository from service to enable IOC
Added IOC with inversify

Replaced ethereal email smpt server with mailhog to extend email functionality

See the companion repo andrewc2020/signup which has front end and docker-compose yml to build services
Add your own mongo cluster to persist accounts and your own .env with mongo connectionstring and mailhog smpt variables as follows:

DB_CONN_STRING=[your mongoose connection string]
SECRET=[your secret for JWT hashing]
EMAIL_FROM="info@node-mongo-signup-verification-api.com"
SMTP_HOST=mailhog
SMTP_PORT=1025
MAILHOG_WEB_PORT=8025


Simplest way to get running on your pc is to build both repos using docker and launch with docker compose up from andrewc2020/signup
mailhog is available through localhost:8025

To run tests yarn run test:mocha 
To build yarn run transpile
To run backend only run yarn start or yarn start:dev

Or docker build -t andrewc2020/signup_backend then docker run -d -p 4000:4000 andrewc2020/signup_backend



