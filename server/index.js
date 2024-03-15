require('dotenv').config();
const express = require('express')
const schema = require('./schema/Schema')
const { ApolloServer} =  require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4')

async function main() {
    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.json())
    const server = new ApolloServer({
        typeDefs: ``,
        resolvers: {},
        schema,
        graphiql: true
    })
    await server.start();
    
    app.use('/graphql' , expressMiddleware(server))
    
    app.listen(port , () => {
        console.log(`server running at port: ${port}` );
    })
}
main();
