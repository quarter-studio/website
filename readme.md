# Quarter Website

## Enviroment

You need to have these installs.

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node / NPM](https://www.npmjs.com/get-npm)
- [Firebase CLI](https://firebase.google.com/docs/cli)

## Setup

Download the repository.

```
git clone git@github.com:quarter-studio/quarter-website.git
```
Install dependencies.

```
npm install
```
## Working
Unfortunately, I don't have it set up very well, so you will have to have two terminal windows open to view the site and compile assets at the same time.

### Serve Site

```
firebase serve
```

### Compile Assets
```
npm run work
```

## Deploying

Deploying is super simple

```
npm run deploy
```

**Always remember to commit after deploying!**

```
git add .
git commit -m '*description*'
git push
```
