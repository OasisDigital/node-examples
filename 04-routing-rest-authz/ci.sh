#!/bin/bash
set -e
set -o xtrace

npm i
npm run build
npm run lint
npm run test
npm run test:e2e
npm run prettier
