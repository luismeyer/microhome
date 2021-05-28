# React λ

AWS Lambda that creates a SSR React app using [Vite](https://github.com/vitejs/vite).

## Installation

Setup dependencies:

```bash
yarn
```

## Development

If you want to develop only the React App you can just start the Vite dev server

```bash
yarn vite:dev
```

If you want to start the SSR Lambda with vite building the React App in the background.

CAUTION: If you make changes in the react app it will take some time to compile since a vite production build is bundled

```bash
yarn watch & yarn dev
```
