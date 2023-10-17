import 'dotenv/config'
import { FastifyReply, FastifyRequest } from 'fastify';
import * as jwt from 'jsonwebtoken'

export function auth(req: FastifyRequest, reply: FastifyReply, next: any){
    const privateKey = process.env.PRIVATE_KEY
    const apiKey = req.headers['authorization']

    if(!apiKey) return reply.status(400).send({message: 'A token is required to send the request. Please log in.'})

    if(!jwt.verify(apiKey.split(' ')[1], privateKey!)) return reply.status(400).send({message: 'Invalid token. Log in.'});

    next()
}