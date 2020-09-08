#!/bin/bash
set -e

npm i
npm run nx -- run-many --target=build --all
npm run lint
npm run nx -- run-many --target=test --all
npm run format:check -- --all
