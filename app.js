const express =  require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const schema = require('./schema/schema')
app.listen(5000, () => console.log("server is listening on 5000 port"))

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))