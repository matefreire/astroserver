-- CreateEnum
CREATE TYPE "Access_level" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Is_accepted" AS ENUM ('YES', 'NO');

-- CreateEnum
CREATE TYPE "Post_type" AS ENUM ('NOTICIA', 'POST', 'EVENTO', 'FOTOGRAFIA', 'DICAS', 'PERGUNTA', 'OUTRO');

-- CreateEnum
CREATE TYPE "Curiosity_type" AS ENUM ('SISTEMA_SOLAR', 'ESTRELAS_GALAXIAS', 'HISTORIA_ASTRONOMIA', 'EXPLORACAO_ESPACIAL', 'FENOMENOS_CELESTES', 'ASTRONOMIA_CULTURAL', 'VIDA_EXTRATERRESTRE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "confirm_password" TEXT NOT NULL,
    "picture" TEXT,
    "access_level" "Access_level" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_accepted" "Is_accepted" NOT NULL DEFAULT 'NO',
    "picture" TEXT,
    "type" "Post_type" NOT NULL DEFAULT 'POST',
    "userId" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Astronomer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "Astronomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_astronomers" (
    "userId" TEXT NOT NULL,
    "astronomerId" TEXT NOT NULL,

    CONSTRAINT "User_astronomers_pkey" PRIMARY KEY ("userId","astronomerId")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "picture" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curiosity" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT,
    "type" "Curiosity_type" NOT NULL,

    CONSTRAINT "Curiosity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Astronomer_name_key" ON "Astronomer"("name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_astronomers" ADD CONSTRAINT "User_astronomers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_astronomers" ADD CONSTRAINT "User_astronomers_astronomerId_fkey" FOREIGN KEY ("astronomerId") REFERENCES "Astronomer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
