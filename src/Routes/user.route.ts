import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../Utils/prisma'
import * as jwt from 'jsonwebtoken'
import { decryptedPassword, encryptPassword } from '../Utils/hash'
import { auth } from '../Utils/auth'

export async function userRoute(app: FastifyInstance) {
    app.post('/login', async (req, reply) => {
        const bodyParser = z.object({
            email: z.string(),
            password: z.string()
        })

        const {
            email,
            password
        } = bodyParser.parse(req.body)

        const existingUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (existingUser) {

            const passwordCheck = decryptedPassword(existingUser.password, atob(password))

            if (passwordCheck) {
                const privateKey = process.env.PRIVATE_KEY

                const token = jwt.sign({ data: existingUser }, privateKey!, { expiresIn: '24h' })

                return reply.status(200).send({
                    message: `Logged in successfully. Welcome ${existingUser.name}`,
                    token: token
                })

            } else {
                return reply.status(400).send({
                    message: 'Wrong email or password. Check the data and try again.'
                })
            }

        } else {
            return reply.status(400).send({
                message: 'Email not registered. Check or contact your administrator.'
            })
        }
    })

    app.post('/user', {preHandler: auth}, async (req, reply) => {
        const bodyParser = z.object({
            name: z.string(),
            role: z.string(),
            email: z.string(),
            password: z.string()
        })

        const {
            email,
            name,
            password,
            role
        } = bodyParser.parse(req.body)

        const existingUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (existingUser) {
            return reply.status(400).send({
                message: 'Existing username, try another name.'
            })
        } else {
            const encryptedPassword = encryptPassword(password)

            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: encryptedPassword,
                    role
                }
            })

            return reply.status(201).send({
                user,
                message: 'User created successfully.'
            })
        }
    })

    app.get('/user/all', {preHandler: auth}, async (req, reply) => {
        const users = await prisma.user.findMany()

        return reply.status(200).send({
            users
        })
    })

    app.get('/user/:id', {preHandler: auth}, async (req, reply) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(req.params)


        const existingUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (existingUser) {
            return reply.status(200).send({
                existingUser
            })
        } else {
            return reply.status(400).send({
                message: 'User not found. Check the ID entered.'
            })
        }
    })

    app.put('/user/update/:id', {preHandler: auth}, async (req, reply) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const bodyParser = z.object({
            name: z.string().optional(),
            role: z.string().optional(),
            password: z.string().optional()
        })

        const {
            name,
            password,
            role
        } = bodyParser.parse(req.body)

        const { id } = paramsSchema.parse(req.params)


        const existingUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (existingUser) {
            if(decryptedPassword(existingUser.password, atob(password!))){
                return reply.status(400).send({
                    message: 'Enter a different password. You cannot use the same password as the previous one.'
                })
            }

            await prisma.user.update({
                where: {
                    id: existingUser.id
                },
                data: {
                    name, 
                    password: atob(password!) ? encryptPassword(atob(password!)) : existingUser.password,
                    role
                }
            })

            return reply.status(200).send({
                message: 'User data updated successfully.'
            })
        } else {
            return reply.status(400).send({
                message: 'User not found. Check the ID entered.'
            })
        }
    })

    app.delete('/user/delete/:id', {preHandler: auth}, async (req, reply) => {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const { id } = paramsSchema.parse(req.params)

        const existingUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (existingUser) {
            await prisma.user.delete({
                where: {
                    id: existingUser.id
                }
            })

            return reply.status(200).send({
                message: 'User deleted successfully.'
            })
        } else {
            return reply.status(400).send({
                message: 'User not found. Check the ID entered.'
            })
        }
    })
}