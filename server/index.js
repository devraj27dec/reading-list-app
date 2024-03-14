require('dotenv').config();
const express = require('express')
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')



async function StartServer () {
    const app = express();
    const port = process.env.PORT || 3000;
    
    app.use(express.json());
    const server = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query : {
                hello : () => `Hey How are you`
            }
        }
    })

    await server.start();

    
    app.use('/graphql' , expressMiddleware(server))
    

    app.listen(port , () => {
        console.log(`server running at port: ${port}` );
    })
}


StartServer();
