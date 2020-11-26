#!/usr/bin/env bash

# Use nodemon to watch and reload our app codebase
./node_modules/.bin/ts-node-dev --project src/api/tsconfig.json -- src/api/index.ts
