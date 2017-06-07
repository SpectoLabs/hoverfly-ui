# Hoverfly UI

[![Join the chat at https://gitter.im/SpectoLabs/hoverfly](https://badges.gitter.im/SpectoLabs/hoverfly.svg)](https://gitter.im/SpectoLabs/hoverfly?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Hoverfly UI is the Angular 4 frontend application that is bundled with [Hoverfly](https://github.com/SpectoLabs/hoverfly).

## Getting started

To develop this application, you will need to run Hoverfly in developer mode. This is to enable Cross Origin Resource Sharing headers, which will enable the Hoverfly UI to successfully communicate with Hoverfly across ports.

```
hoverfly -dev
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
