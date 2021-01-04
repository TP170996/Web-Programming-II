const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const fetch = require('node-fetch');
const { promisify } = require("util");


let binnedImages=[];
let userPostedImages = [];

const typeDefs = gql`
  type ImagePost {
    id: String!
    url: String
    
    userPosted: Boolean
    binned:Boolean
  }
  
  
  type Query {
    userPostedImages : [ImagePost]!
    binnedImages:[ImagePost]!
    unsplashImages:[ImagePost]!
    
  }
  type Mutation {
    addToBin(id: String, url: String):String
    uploadImage(url: String!):String
    deleteImage(id: String!):String
    updateImage(
      id:String!
      binned:Boolean
      ):String
  }
`;

let client = require('redis').createClient("redis://127.0.0.1");
let Redis = require('ioredis');
let redis = new Redis("redis://127.0.0.1");
client.on("connect", function(error) {
  console.log(' Redis connected');
});
client.on(" Redis connect error", function(error) {
  console.error(error);
});


const clientGet = promisify(client.get).bind(client);
const clientSet = promisify(client.set).bind(client);

const redisSet = async (key, value) => await clientSet(key, JSON.stringify(value))
const redisGet = async (key) =>  JSON.parse(await clientGet((key)))

const resolvers = {
    Query: {
      userPostedImages: async function() {
        let res = await redisGet('userPostedImages')
        return res || []
      },
      binnedImages: async () => await redisGet('binnedImages')|| [] ,
      unsplashImages: async () => {
        const response = await fetch('https://api.unsplash.com/photos/?page=88&client_id=dpwnC3a4cLSgV84z1ONvOn4j5zpoOeyolXKyiLxvaTI')
        let data = await response.json()
        data = data.map(item => {
          return {
            id: item.id,
            url: item.urls.raw,
            posterName:item.user.username,
            description:item.description,
            userPosted:false,
            binned:false
          }
        })

        return data || []
      }
    },
    Mutation: {
      addToBin: async(parent, args, context, info) => {
        let binnedImages = await redisGet('binnedImages')
        
            binnedImages.push({ id: args.id, url: args.url })
           
        
        await redisSet('binnedImages', binnedImages)

        return 'done'
      },
      uploadImage: async (parent, args, context, info) => {
  
        userPostedImages.push({
          id: Date.now().toString(),
          url: args.url,
          posterName: args.posterName,
          description:args.description,
          userPosted:true,
          binned:false
        });

        await redisSet('userPostedImages', userPostedImages)

        return 'done'

      },
      updateImage: async (parent, args, context, info) => {
        let userPostedImages = await redisGet('userPostedImages')
        for (let i in userPostedImages) {
          if (userPostedImages[i].id === args.id) {
            if(userPostedImages[i].binned===true)
            {
              userPostedImages[i].binned=false
              for(let j=0;j<binnedImages.length;j++)
              {
                if(binnedImages[j].id===userPostedImages[i].id)
                {
                  binnedImages.splice(j, 1);            
                }
              }
            }
            else{
              userPostedImages[i].binned=true
              binnedImages.push(userPostedImages[i])
            }   
                      
          }
          
          
         
        }
        await redisSet('userPostedImages', userPostedImages)
        await redisSet('binnedImages', binnedImages)

        return args.id;
      },
      deleteImage: async (parent, args, context, info) => {
        let userPostedImages = await redisGet('userPostedImages')
        for (let i in userPostedImages) {
          if (userPostedImages[i].id === args.id) {
            userPostedImages.splice(i, 1);
          }
        }
        
        await redisSet('userPostedImages', userPostedImages)
      }
    }
  };



const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.use(cors());

app.listen({ port: 4000 }, () =>
  console.log('Now browse to http://localhost:4000' + server.graphqlPath)
);
