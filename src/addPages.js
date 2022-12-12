
async function sendData(){
 const title = document.getElementById('title').value.replace(/\s/g,'_');
 const creator = document.getAnimations("creatorname").value.replace(/\s/g,'_');
 const tag = document.getElementById("tag").value;

 const titleR = await getComputedStyle();



 const url = "http://the-artchive/artworks?" + "&title=" + title + "&creator=" + creator + "&tag=" + tag;

 const response = await fetch(url);
 if(response.ok){
    alert('Adding the book to the server database!');
 }else{
    alert('Fail to add the book!');
 }
}


