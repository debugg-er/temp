#!/bin/bash

APP_NAME=$1
APP_DIR="./apps/$1/src/proto"

if [ -e $APP_NAME ]; then
    echo "Missing parameters"
    exit 1
fi


if [ ! -d $APP_DIR ]; then
    mkdir $APP_DIR
fi

protoc -I=./proto/$1 \
    --plugin=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_opt=nestJs=true \
    --ts_proto_opt=useDate=true \
    --ts_proto_out=$APP_DIR \
    --ts_proto_opt=useOptionals=none \
    ./proto/$APP_NAME/**.proto
