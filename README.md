# MAPHISFront

A front-end project to compliment project [MAPHIS](https://github.com/Emvlt/MAPHIS).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

### Installation of all the dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Creating a Release

Push all of you changes to the repo. Create a PR, get it reviewed and then finally merge it.

Now all we have to do is create a tag and then a release. Once a release has been created, it will be automatically deployed to AWS.

## Additional Comments

For learning more about vue please go through https://vuejs.org/guide/introduction.html

We also have pre commit hooks which checks the integrity of the code submitted. As long as there are no errors, your code is ready to be committed. If errors can be seen then there will be indications, where the errors are and how to fix them (sometimes). You can force push a code but is not advised.
