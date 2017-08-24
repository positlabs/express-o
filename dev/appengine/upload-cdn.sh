#!/bin/bash

BUCKET=$1

echo "UPLOADING TO " $BUCKET

# upload with gzip compression
cd public
gsutil -m cp -z html,css,js -r ./ $BUCKET
cd ..

# make public
gsutil -m acl set -R -a public-read $BUCKET

# set cors
# https://cloud.google.com/storage/docs/gsutil/commands/cors
gsutil cors set `dirname $0`/cors.json $BUCKET
