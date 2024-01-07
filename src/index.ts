import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipe } from 'ts-functional-pipe'
const app = fastify({
  logger: true,
})
console.log(path.dirname(import.meta.url))
app.register(fastifyStatic, {
  root: path.join(
    pipe(path.dirname, fileURLToPath)(import.meta.url),
    '../public'
  ),
  prefix: '/public/',
})

app.get('/', (req, reply) => {
  return reply.sendFile('index.html')
})

try {
  await app.listen({
    port: 3000,
  })
} catch (e) {
  app.log.error(e)
  process.exit(1)
}
