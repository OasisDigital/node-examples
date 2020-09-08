#!/bin/bash

set -e

PROJECT_ID=node-demo-kyle

gcloud builds submit --project $PROJECT_ID

# First run:

# gcloud compute instances create-with-container chat \
#  --container-image gcr.io/$PROJECT_ID/chat \
#  --tags http-server,https-server \
#  --machine-type e2-micro \
#  --project $PROJECT_ID

# gcloud compute firewall-rules create allow-http --allow tcp:80 --target-tags http-server --project $PROJECT_ID

# Update:

gcloud compute instances update-container chat \
  --container-image gcr.io/$PROJECT_ID/chat \
  --project $PROJECT_ID

# http://35.196.90.145/
