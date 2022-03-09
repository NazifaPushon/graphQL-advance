const express =  require('express')
const app = express();

app.listen(5000, () => console.log("server is listening on 5000 port"))

app.get('/' , (req,res) => {
    res.send("hello graphql")
})