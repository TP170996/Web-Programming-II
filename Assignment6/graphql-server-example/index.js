const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');
const lodash = require('lodash');
const uuid = require('uuid');

let id=[];
let url=[];
let images
let username=[];
let description=[];
let xyz=[];

async function getapi() {
 return fetch("https://api.unsplash.com/photos/?page=88&client_id=dpwnC3a4cLSgV84z1ONvOn4j5zpoOeyolXKyiLxvaTI")
      .then(response => response.json())
      .then(json => {
        return json
      });     
}

xyz=getapi();
console.log(xyz)



const typeDefs = gql`
type Query {
  images: [Image]
}

type Image {
  id: String,
  url: String
  
}



`;

const resolvers = {
  Query: {
       
    images: () => images
    
  },
  
  
  
};

const server = new ApolloServer({
  typeDefs,
  resolvers
  
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});