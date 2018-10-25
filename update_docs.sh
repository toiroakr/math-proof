#!/usr/bin/env bash

npm run lint
npm run build
rm -rf docs
mv dist docs
sed -i '' -e 's/=\//=\/math-proof\//g' docs/index.html
