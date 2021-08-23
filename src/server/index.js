//set env-variables
const dotenv = require('dotenv');
dotenv.config();

const mockAPIResponse = require('./mockAPI.js')

const PORT = 8081

// TODO add Configuration to be able to use env variables


//require express ==> create instance  
const express = require('express');
const app = express();

//cors
const cors = require('cors');
app.use(cors());

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// express static directory.
app.use(express.static('dist'));


app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})
// a route that handling post request for new URL that coming from the frontend
/* TODO:
    1. GET the url from the request body
    2. Build the URL it should be something like `${BASE_API_URL}?key=${MEAN_CLOUD_API_KEY}&url=${req.body.url}&lang=en`
    3. Fetch Data from API
    4. Send it to the client
    5. REMOVE THIS TODO AFTER DOING IT 😎😎
    server sends only specified data to the client with below codes
     const sample = {
       text: '',
       score_tag : '',
       agreement : '',
       subjectivity : '',
       confidence : '',
       irony : ''
     }
*/

//credentials
const apiKey = process.env.API_KEY
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const lang = 'en'
    
//post route 
app.post('/postURL', async(req,res)=>{
    console.log(req.body)
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${req.body.url}&lang=en`);
    try{
   
        const data = await response.json()
        console.log(data)
        res.send(data)
    }
    catch(error){
        console.log('error',error)
     
    }
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

// TODO: export app to use it in the unit testing
