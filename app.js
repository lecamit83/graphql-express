const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config');
const graphQLHTTP = require('express-graphql');


const schema = require('./schemas/root.schema');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

//connect database
db.localConnect();

// thirdty middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// routing GraphQL
app.use('/graphql', graphQLHTTP({
  schema,
  graphiql : true,
  pretty : true,
  customFormatErrorFn : (error) => { 
    return {
      message : error.message,
      code : error.code
    }
  },
}));

// Routing RESTful API
app.get('/', (req, res)=>{
  res.send('Welcome to GraphQL Express!');
})

app.listen(PORT, function(error) {
  if(error) throw error;
  console.log(`Server is running on PORT=${PORT}`);
})
