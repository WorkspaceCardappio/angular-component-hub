## Cardappio

### 1.0.16 - 2025-09-30
    - Ajustando botão de delete do actions-list para que o modal seja fechado e a listagem seja atualizada ao concluir a request 

### 1.0.15 - 2025-09-30
    - Ajustando auto-complete-component para reconhecer alterações no formControlName

### 1.0.14 - 2025-09-29
    - Definindo input para criação de menu com base em rotas

### 1.0.13 - 2025-09-28
    - Permitindo personalizar coluna na listagem com base no ngTemplate
    - Ajustando scroll lateral dependendo do filtro

### 1.0.12 - 2025-09-18
    - Ajustando paginator para emitir currentPage - 1
    - Ajustando valor default listagem para 0
    - Criando unpulish version para npm
    - Alterando nome de Component de listagem para 'CardappioListCompoenent'
    - Não emitindo evento de filter quando filter não tem valor

### 1.0.8 - 2025-09-18
    - Ajustando component de input para passar formControlName

### 1.0.7 - 2025-09-17
    - Adicionando loaging listagem quando lista demora
    - Tratando bug de paginator quando lista demora e não tem o page number na response
    - Passando route para actions list (edit/delete)
    - Chamando service quando delete é executado
    - Desabilitando evento de clique no filtro da listagem quando form é invalido

### 1.0.6 - 2025-09-10
    - Tratando error .length undefined in filter

### 1.0.5 - 2025-09-10
    - Republicando versão 
    - Removendo pasta desnecessária
    - Criação publish.sh