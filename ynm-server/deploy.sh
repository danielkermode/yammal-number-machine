#!/bin/bash

rsync -av -e "ssh -i ~/.ssh/yammal" --exclude 'target' --exclude='.env' --exclude='deploy.sh' ./ yammal@209.97.162.194:/home/yammal/server/

ssh -i ~/.ssh/yammal yammal@209.97.162.194 ./build-server.sh
