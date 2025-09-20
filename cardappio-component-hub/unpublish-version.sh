#!/bin/bash

if [ -z "$1" ]; then
  echo "Versão é obrigatória"
  exit 1
fi

PACKAGE_NAME="cardappio-component-hub"

VERSION="$1"

echo "Removendo $PACKAGE_NAME@$VERSION do NPM..."
npm unpublish "$PACKAGE_NAME@$VERSION" --force

if [ $? -eq 0 ]; then
  echo "✅ Versão $PACKAGE_NAME@$VERSION removida com sucesso."
else
  echo "❌ Falha ao remover $PACKAGE_NAME@$VERSION."
fi
