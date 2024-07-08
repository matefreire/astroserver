import { Astronomer, Comment,  User, Post, } from '@prisma/client'

type UserType = User

type AstronomerType = Astronomer

type CommentType = Comment

type PostType = Post

export { UserType, AstronomerType, CommentType, PostType }