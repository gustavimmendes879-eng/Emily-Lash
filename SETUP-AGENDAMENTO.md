# Como ativar o agendamento com bloqueio de horário real

O site agora consulta um banco de dados de verdade antes de confirmar um
agendamento. Quando alguém reserva um horário, ele fica indisponível pra
todo mundo, na hora. Siga os passos abaixo (leva uns 10 minutos).

## 1. Criar o projeto no Supabase (grátis)

1. Acesse https://supabase.com e crie uma conta (dá pra entrar com GitHub).
2. Clique em **New Project**, escolha um nome (ex: "emily-clara") e uma senha
   pro banco (guarde essa senha, mas ela não é usada no site).
3. Aguarde o projeto terminar de ser criado (leva 1–2 minutos).

## 2. Criar a tabela de agendamentos

1. No painel do Supabase, vá em **SQL Editor** (menu lateral).
2. Clique em **New query** e cole o código abaixo:

```sql
create table bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  service_type text not null,
  service_name text not null,
  price integer,
  date date not null,
  time text not null,
  created_at timestamptz default now(),
  unique (date, time)
);

alter table bookings enable row level security;

create policy "Qualquer um pode ver os horários ocupados"
  on bookings for select
  using (true);

create policy "Qualquer um pode criar um agendamento"
  on bookings for insert
  with check (true);
```

3. Clique em **Run**. Isso cria a tabela e garante duas coisas importantes:
   - `unique (date, time)`: o próprio banco recusa dois agendamentos pra
     mesma data e horário — é isso que impede overbooking, mesmo que duas
     pessoas cliquem em "enviar" ao mesmo tempo.
   - As políticas de segurança (RLS) liberam leitura e criação, sem liberar
     edição ou exclusão pelos visitantes do site.

## 3. Pegar as chaves do projeto

1. No painel do Supabase, vá em **Settings > API**.
2. Copie:
   - **Project URL** → isso é o `SUPABASE_URL`
   - **anon public key** → isso é o `SUPABASE_ANON_KEY`

## 4. Testar localmente (opcional)

1. Na raiz do projeto, copie `.env.local.example` para `.env.local`.
2. Cole a URL e a chave que você copiou no passo 3.
3. Rode `pnpm install` e depois `pnpm dev`.
4. Abra `http://localhost:3000#agendar` e teste um agendamento — o horário
   escolhido deve aparecer como indisponível se você recarregar a página.

## 5. Subir pro GitHub

```bash
git init
git add .
git commit -m "Site Emily Clara com agendamento"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPO.git
git push -u origin main
```

(O `.env.local` **não vai junto** — ele já está no `.gitignore` de propósito,
pra você não vazar as chaves no repositório.)

## 6. Publicar na Vercel (grátis)

O GitHub Pages **não serve** pra esse site porque ele só hospeda arquivos
estáticos, e o agendamento precisa rodar código no servidor (a rota
`/api/bookings`). A Vercel foi feita justamente pra isso e é gratuita pra
esse tipo de projeto.

1. Acesse https://vercel.com e entre com sua conta do GitHub.
2. Clique em **Add New > Project** e selecione o repositório que você
   acabou de subir.
3. Antes de clicar em "Deploy", abra **Environment Variables** e adicione:
   - `SUPABASE_URL` → cole a Project URL
   - `SUPABASE_ANON_KEY` → cole a anon public key
4. Clique em **Deploy**. Em 1–2 minutos o site estará no ar, com o link
   tipo `emily-clara.vercel.app`.
5. Se quiser um domínio próprio (ex: `emilyclaralash.com.br`), dá pra
   configurar depois em **Settings > Domains** no mesmo projeto da Vercel.

Pronto — a partir daí, todo agendamento feito no site fica salvo no
Supabase e os horários já reservados somem da lista pra todo mundo,
automaticamente.
