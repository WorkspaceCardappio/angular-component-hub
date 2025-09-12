# Cardappio Component Hub

Biblioteca de componentes Angular para o sistema Cardappio.

## Pré-requisitos

### Node.js
É necessário ter **Node.js versão 20 ou superior** instalado.

**Usando NVM (recomendado):**
```bash
# Instalar Node.js 20
nvm install 20
nvm use 20

# Verificar versão
node --version
```

**Ou baixe diretamente do site:** https://nodejs.org

## Instalação

```bash
npm install
```

## Como usar

### 1. Fazer login no npm
Antes de publicar, faça login com as credenciais do Cardappio:

```bash
npm login
```

- **Usuário:** `cardappio`  
- **Senha:** Está disponível no Drive da empresa

### 2. Compilar a biblioteca

```bash
ng build cardappio-component-hub
```

### 3. Publicar no npm

```bash
# Ir para o diretório de distribuição
cd dist/cardappio-component-hub

# Publicar
npm publish
```

## Desenvolvimento

### Gerar novos componentes
```bash
ng generate component nome-do-componente
```

### Executar testes
```bash
ng test
```

### Ver todos os comandos disponíveis
```bash
ng generate --help
```

## Observações

- Sempre incremente a versão antes de publicar: `npm version patch`
- A biblioteca será compilada na pasta `dist/`
- Certifique-se de estar logado no npm antes de publicar
