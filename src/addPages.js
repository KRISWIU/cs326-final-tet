
window.onload = () => {

      document.getElementById("addWorkButton").addEventListener("click", async () => {           
            console.log("Running code for addWorkButton..."); 
            const title = document.getElementById('title').value.replace(/\s/g,'_');
            const creator = document.getElementById("creatorName").value.replace(/\s/g,'_');
            const tag = document.getElementById("tag").value;
            
            const tagId = makeRequest(baseURL+ "/tags/"+tag,'GET');
            if(tagId === null){
                  tagId = makeRequest(baseURL + "/tags?tagName="+tag,'POST');
            }
            const creatorId = makeRequest(baseURL + "/creators/" + creator,'GET');
            if(creatorId === null){
                  creatorId = makeRequest(baseURL + "/creators?creator=" + creator,'POST');
            }


            const url = baseURL + "/artworks?" + "title=" + title + "&creator=" + creatorId.id + "&tag=" + tagId.id;

            const response = makeRequest(url,'POST');
            console.log(response);
            if(Object.keys(response).includes("error")){
                  alert('Fail to add the book!');
            }else{
                  alert('Adding the book to the server database!');
            }
      });

}