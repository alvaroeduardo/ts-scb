import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../Utils/prisma'

export async function userRoute(app: FastifyInstance) {
    app.post('/user', async (req, reply) => {
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
                name: name
            }
        })

        if(existingUser){
            return reply.status(400).send({
                message: 'Existing username, try another name.'
            })
        } else {
            const user = await prisma.user.create({
                data: {
                    email, name, password, role
                }
            })

            return reply.status(201).send({
                user,
                message: 'User created successfully.'
            })
        }
    })
}