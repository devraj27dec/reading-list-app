const graphql = require('graphql')

const [GraphQLObjectType , GraphQLID , GraphQLString] = graphql;

/**Book Schema **/
const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
    
    })
})
