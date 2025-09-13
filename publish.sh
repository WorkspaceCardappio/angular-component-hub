#!/bin/bash

set -e

LIB_NAME="cardappio-component-hub"
DIST_PATH="dist/$LIB_NAME"

echo "Executando testes: $LIB_NAME"
ng test $LIB_NAME --watch=false

echo "Iniciando build"
npm run build $LIB_NAME

cd $DIST_PATH

echo "Publicando"
npm publish --access public
echo "Concluído"
