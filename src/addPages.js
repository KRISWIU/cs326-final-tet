
async function sendData(){
 const title = document.getElementById('title').value.replace(/\s/g,'_');
 const creator = document.getAnimations("creatorname").value.replace(/\s/g,'_');
 const tag = document.getElementById("tag").value;
 
 const tagId = await fetch("https://the-artchive.herokuapp.com/tags/"+tag,'GET');
 if(tagId == null){
       tagId = await fetch("https://the-artchive.herokuapp.com/tags?tagName="+tag,'POST');
 }
 const creatorId = await fetch("https://the-artchive.herokuapp.com/creators/"+creator,'GET');
 if(creatorId == null){
       creatorId = await fetch("https://the-artchive.herokuapp.com/creators?creator="+creator,'POST');
 }


 const url = "http://the-artchive/artworks?" + "title=" + title + "&creator=" + creatorId.id + "&tag=" + tagId.id;

 const response = await fetch(url,'POST');
 if(Object.keys(response).includes("error")){
    alert('Fail to add the book!');
    
 }else{
    alert('Adding the book to the server database!');
 }
}


