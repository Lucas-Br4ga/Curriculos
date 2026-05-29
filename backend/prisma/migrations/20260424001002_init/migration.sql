-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfis" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "cidade" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perfis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" TEXT NOT NULL,
    "perfil_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "nivel" TEXT NOT NULL DEFAULT 'intermediario',
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiencias" (
    "id" TEXT NOT NULL,
    "perfil_id" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "periodo_inicio" TIMESTAMP(3) NOT NULL,
    "periodo_fim" TIMESTAMP(3),
    "atual" BOOLEAN NOT NULL DEFAULT false,
    "descricao" TEXT,
    "tecnologias" TEXT[],
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "experiencias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projetos" (
    "id" TEXT NOT NULL,
    "perfil_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "link" TEXT,
    "tecnologias" TEXT[],
    "ordem" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "projetos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formacoes" (
    "id" TEXT NOT NULL,
    "perfil_id" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "instituicao" TEXT NOT NULL,
    "periodo_inicio" TIMESTAMP(3),
    "periodo_fim" TIMESTAMP(3),
    "atual" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "formacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vagas" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "empresa" TEXT,
    "descricao_original" TEXT NOT NULL,
    "keywords" TEXT[],
    "keywords_match" TEXT[],
    "keywords_faltantes" TEXT[],
    "pontuacao" INTEGER NOT NULL,
    "breakdown" JSONB NOT NULL,
    "curriculo_json" JSONB NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vagas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "perfis_user_id_key" ON "perfis"("user_id");

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfis" ADD CONSTRAINT "perfis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "experiencias" ADD CONSTRAINT "experiencias_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projetos" ADD CONSTRAINT "projetos_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "formacoes" ADD CONSTRAINT "formacoes_perfil_id_fkey" FOREIGN KEY ("perfil_id") REFERENCES "perfis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vagas" ADD CONSTRAINT "vagas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
