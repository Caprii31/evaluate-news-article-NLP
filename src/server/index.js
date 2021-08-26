const mockAPIResponse = require('./mockAPI.js')
var path = require('path')
const fetch = require('node-fetch')

//set env-variables
const dotenv = require('dotenv')
dotenv.config();


const PORT = 3000

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

// ===> port
app.listen(PORT, function () {
    console.log('Example app listening on port 3000!')
})


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
  
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

const apiKey = process.env.API_KEY

    
//post route 

app.post('/postURL', async(req,res)=>{
    console.log(req.body)
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${req.body.url}&lang=en`)
   console.log(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${req.body.url}&lang=en`)
    try{
   
        const data = await response.json()
        const articleURL = {
            agreement: data.agreement,
            confidence: data.confidence,
            irony: data.irony,
            model: data.model,
            senText: data.sentence_list[0].text,
            scoreTag: data.score_tag,
            subjective: data.subjectivity 
        }
        console.log(articleURL)
    
        res.send(articleURL)
    }
    catch(error){
        console.log('error',error)
     
    }
})






