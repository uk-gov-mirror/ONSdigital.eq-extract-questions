#!/bin/bash
echo "running tests..."
NODE_ENV=development \
yarn jest --runInBand --detectOpenHandles --forceExit "$@"