#!/bin/bash

set -e

npm run build

gcloud app deploy --project node-demo-kyle

# https://node-demo-kyle.uc.r.appspot.com

