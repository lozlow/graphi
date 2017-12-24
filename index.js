const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaBody = require('koa-bodyparser')
const logger = require('koa-logger')
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa')

const PORT = 3031

const app = new Koa()
const router = new KoaRouter()

const { makeExecutableSchema } = require('graphql-tools')
const schema = makeExecutableSchema({
  typeDefs: require('./schema'),
  resolvers: require('./resolvers')
})
const graphqlHandler = graphqlKoa({ schema: schema })

router.post('/graphql', koaBody(), graphqlHandler)
router.get('/graphql', graphqlHandler)
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }))

app.use(logger())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT)
