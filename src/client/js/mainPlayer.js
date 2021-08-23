const { checkIfURL } = require("../../../../evaluate-news-article/src/client");

//  get btn submit
const btn = document.getElementById('article-url');

// TODO: add event listener to it when the click to call handleSubmit function
btn.addEventListener('click',passURL)

 
 // Get Value of the input for URL
let userURL = btn.value
 // Check if it's URL or not
 if(checkIfURL(userURl)){
     fetch()
 }