import { checkIfURL } from "./checker"

//function to handle when submit

 function passURL(event){
     event.preventDefault()
// Get Value of the input for URL
let userURL = document.getElementById('article-url').value

// Check if it's URL or not
if(Client.checkIfURL(userURL)){
   postURL('http://localhost:3000/postURl', {url:userURL})
   .then(res =>{
       console.log(res)
       document.getElementById('agreement').innerHTML=`Agreement:  ${res.agreement}`
       document.getElementById('confidence').innerHTML=`Confidence:  ${res.confidence}`
       document.getElementById('irony').innerHTML=`Irony:  ${res.irony}`
       document.getElementById('model').innerHTML=`Model:  ${res.model}`
       document.getElementById('subjective').innerHTML=`Subjectivity:  ${res.subjective}`
       document.getElementById('score_tag').innerHTML=`Score tag:  ${res.scoreTag}`
       document.getElementById('text').innerHTML=`Text:  ${res.senText}`

   })
   .catch(e=>{
       console.log('error',e)
   })
 }else{
     alert('please enter valid URL')
 }
}

const postURL= async(url='',data={})=>{
    console.log(data)
    const respond = await  fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)  
     })
     let preData = await respond.json()
     return preData
}



 export { passURL }
