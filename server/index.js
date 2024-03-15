require('dotenv').config();
const express = require('express')
const schema = require('./schema/Schema')
const { ApolloServer} =  require('@apollo/server');
const {expressMiddleware} = require('@apollo/server/express4');
const { mongoose } = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URL;

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
    

    await mongoose.connect(MONGODB_URI)
        .then(() => console.log('Database Connected Succesfully'))
        .catch(err => console.log(err));
    
    app.listen(port , () => {
        console.log(`server running at port: ${port}` );
    })
}
main();
