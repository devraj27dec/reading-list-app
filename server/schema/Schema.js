const graphql = require('graphql')

const { GraphQLSchema,
    GraphQLObjectType , 
    GraphQLID ,
    GraphQLString,
    GraphQLInt ,
    GraphQLList } = graphql;


const _ = require('lodash');


// var books = [
//     {name: 'Name of the Wind', genre: 'Fantasy', id: '1' , authorId: "1"},
//     {name: 'The final Emperor', genre: 'Fantasy', id: '2' , authorId: "2"},
//     {name: 'The Long Earth', genre: 'Sci-Fi', id: '3' , authorId: "3"},
//     {name: 'The Hero Age', genre: 'Fantasy', id: '4' , authorId: "1"},
//     {name: 'The Color of magic', genre: 'Fantasy', id: '5' , authorId: "2"},
//     {name: 'The Light Fatntastic', genre: 'Fantasy', id: '6' , authorId: "2"},
// ]


// var authors = [
//     {name: "Ashneer Grover" , age: 50, id: '1' },
//     {name: "Tanya partap" , age: 45, id: '2'},
//     {name: "Hitesh Choudhary" , age: 40, id: '3' }
// ]


/**Book Schema **/
const BookType = new GraphQLObjectType({
    name:'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent , args) {
                return _.find(authors, {id: parent.authorId})
            }
        }
        
    })
})


const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        // Type Relations
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books,{authorId: parent.id})
            }
        }
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve: (parent , args) => {
                // code to tget data from db/other source
               return _.find(books,{id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLString}},
            resolve: (parent , args) => {
                return _.find(authors,{id: args.id})
            }
        },
        books: {
            type: new GraphQLList(BookType), 
            resolve(parent, args) {
                return books
            }
        },
        authors : {
            type: new GraphQLList(AuthorType), 
            resolve(parent, args) {
                return authors
            }
        }
    }   
})

module.exports = new GraphQLSchema({
    query: RootQuery
})