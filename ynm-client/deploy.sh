#!/bin/bash
npm run build

rsync -av -e "ssh -i ~/.ssh/yammal" ./build/ yammal@209.97.162.194:/var/www/yammal.ai/html
