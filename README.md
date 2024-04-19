# Playlists

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.5.

## Install

run `npm install` to install all dependencies

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Run Locally

Run `npm run start` to start the project locally

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running cypress tests

--- To run the project and run the tests against use these commands ---

Run `npm run start:cypress:open` - This will open on the cypress tooling to run the tests from

Run `npm run start:cypress:e2e` - This will run the end to end tests.

Run `npm run start:cypress:components` - This will run the component tests.

Run `npm run start:cypress:all` - This will run all the cypress tests.

--- If you are already running the project you can use these ---

Run `npm run cypress:open` - This will open on the cypress tooling to run the tests from

Run `npm run cypress:e2e` - This will run the end to end tests.

Run `npm run cypress:components` - This will run the component tests.

Run `npm run cypress:all` - This will run all the cypress tests.

## Cypress issues

Currently using local-cypress due to global types messing with the types of jasmine/chai

https://github.com/cypress-io/cypress/issues/7552
