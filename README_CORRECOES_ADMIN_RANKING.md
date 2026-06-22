# Correções aplicadas no Bolão Copa 2026

## Admin Web

Acesse o painel em:

- http://localhost:8080/admin/login

Credenciais padrão criadas pelo `DataLoader`:

- E-mail: admin@bolao.com
- Senha: admin123

O painel permite:

- Ver dashboard
- Cadastrar, editar e remover seleções
- Cadastrar, editar e remover partidas
- Lançar resultado
- Corrigir resultado
- Limpar resultado
- Bloquear e desbloquear usuários

## Ranking

A regra de pontuação ficou assim:

- Placar exato: 10 pontos
- Acerto do vencedor ou empate: 5 pontos
- Erro total: 0 pontos

Quando o admin lança, corrige ou limpa resultado, o backend recalcula os palpites daquela partida e atualiza:

- pontuacaoTotal do usuário
- placaresExatos do usuário

A ordenação do ranking é:

1. Maior pontuação
2. Maior quantidade de placares exatos
3. Cadastro mais antigo

Endpoints:

- GET /api/ranking
- GET /api/ranking/me

O endpoint `/api/ranking` retorna o top 50. O endpoint `/api/ranking/me` retorna a posição do usuário logado mesmo se ele estiver fora do top 50.

## Mobile

A tela de ranking foi ajustada para buscar o top 50 e também a posição do usuário logado.

## Observação

Arquivos de cache, IDE e controle local foram removidos do ZIP final para não pesar nem atrapalhar o projeto.
