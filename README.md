<!-- @format -->

![Uwazi Logo](https://uwazi.io/assets/16369950628097kcvfquj74a.svg)

Uwazi is a flexible database application to capture and organise collections of information with a particular focus on document management. HURIDOCS started Uwazi and is supporting dozens of human rights organisations globally to use the tool.

[Uwazi](https://www.uwazi.io/) | [HURIDOCS](https://huridocs.org/)

# Dependencies

Before anything else you will need to install the client's dependencies:

- **NodeJs 16.14.2** For ease of update, use nvm: https://github.com/creationix/nvm.
- **Yarn** https://yarnpkg.com/en/docs/install.
- **UWAZI** https://github.com/huridocs/uwazi.

# Development

If you want to use the latest development code:

```
$ git clone https://github.com/huridocs/uwazi-client
$ cd uwazi-client
$ yarn install

```

## Development Run

First you need to have UWAZI running on localhost:3000.
Then you can start UWAZI-client with:

```
$ yarn dev
```

This will launch a NextJS server on localhost:3001.

## Testing

### Unit and Integration tests

We test using the JEST framework with Testing Library. To run the unit and integration tests, execute:

```
$ yarn test
```

This will run the entire test suite.

### End to End (e2e)

End to end tests requires both UWAZI-client and UWAZI to be running.

Test are runned using Cypress:

```
$ yarn cypress
```

This will install the necessary files for the Cypress client and open testing UI.
