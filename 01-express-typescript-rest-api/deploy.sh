#!/bin/bash

set -e

npm run build

gcloud functions deploy example --runtime nodejs12 --trigger-http --project node-demo-kyle

# https://us-central1-node-demo-kyle.cloudfunctions.net/example/

# https://us-central1-node-demo-kyle.cloudfunctions.net/example/word/most?word=google
