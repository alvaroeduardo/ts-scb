import fastify from "fastify";
import { fastifyCors } from "@fastify/cors"
import { userRoute } from "./Routes/user.route";
import { auth } from "./Utils/auth";

const app = fastify()

app.register(fastifyCors, {
    origin: '*'
})

app.register(userRoute)

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server started successfully.')
})