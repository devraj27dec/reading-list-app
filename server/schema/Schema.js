const graphql = require('graphql')
const { Author } = require('../models/author.model.js')
const { Book } = require('../models/book.model.js')


const { GraphQLSchema,
    GraphQLObjectType , 
    GraphQLID ,
    GraphQLString,
    GraphQLInt ,
    GraphQLList,
    GraphQLNonNull } = graphql;


const _ = require('lodash');


var books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1' , authorId: "1"},
    {name: 'The final Emperor', genre: 'Fantasy', id: '2' , authorId: "2"},
    {name: 'The Long Earth', genre: 'Sci-Fi', id: '3' , authorId: "3"},
    {name: 'The Hero Age', genre: 'Fantasy', id: '4' , authorId: "1"},
    {name: 'The Color of magic', genre: 'Fantasy', id: '5' , authorId: "2"},
    {name: 'The Light Fatntastic', genre: 'Fantasy', id: '6' , authorId: "2"},
]


var authors = [
    {name: "Ashneer Grover" , age: 50, id: '1' },
    {name: "Tanya partap" , age: 45, id: '2'},
    {name: "Hitesh Choudhary" , age: 40, id: '3' }
]


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



// mutation allows to mutate or change our data having data deleting data &  updating data
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)}
            },
            async resolve(parent ,args) {
                const author = new Author({ ...args });
                return await author.save();
            }
        },
        addBook: {
            type: BookType,
            args:{
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent ,args) {
                const book = new Book({ ...args });
                return await book.save();
            }
        },
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})