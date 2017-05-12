# Explaain Election App

### Description

This application allows users to pass through simple steps and get some results or/and tips on the General Election 2017.

### Installation

```sh
git clone https://github.com/explaain/election2017
cd election2017
npm install -d
npm install gulp -g
```

### Development

```sh
git checkout development
# build and cache external libraries (once per day or when those libraries are updated)
npm run build
# run dev silently
npm run dev
# OR run with debugging (easier to catch errors on the fly!)
npm run debug
# http://localhost:1234/
```
When pushing local **development** branch to **origin/development** it deploys an instance at http://uk-election-2017-dev.herokuapp.com/students
