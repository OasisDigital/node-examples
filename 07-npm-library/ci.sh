#!/bin/bash
set -e

npm i
npm run build
npm run lint
npm run test
npm run prettier
