//import { ListPage } from './listPage';
// This is the version for heroku: change this to false if testing locally.
const isLocalVersion = true;
let baseURL = "";
if (isLocalVersion === true) { 
    baseURL = "https://the-artchive.herokuapp.com";
} else {
    baseURL = "http://localhost:8000";
}

//const testList = new ListPage(baseURL,"test");
//testList.render();

async function makeRequest(url, method) {
    const response = await fetch(url, { method: method });
    const responsejson = await response.json();
    return responsejson;
}

console.log(document.getElementById("loginProfileButton").innerHTML);
const userName = "test";
const url = "/users/test";
const result = await makeRequest(url,"GET");
const lists = result["lists"];
console.log(lists);

const artwork_lists = document.getElementById("art_list");
for(let i = 0; i<lists.length;i++){
    const artwork = lists[i];
    const artwork_ele = document.createElement("div");
    artwork_ele.classList.add("artwork", "col-sm-5")
    const artwork_name = artwork["name"];
    const artwork_artworks = artwork["artworks"];
    const artwork_name_ele = document.createElement("h4");
    const artwork_artworks_ele = document.createElement("h5");
    
    artwork_name_ele.innerHTML = "Name: "+artwork_name;
    artwork_artworks_ele.innerHTML = "Artworks: "+artwork_artworks.toString();
    artwork_ele.appendChild(artwork_name_ele);
    artwork_ele.appendChild(artwork_artworks_ele);

    //delete button
    const artwork_delete_ele = document.createElement("button");
    artwork_delete_ele.innerHTML="Delete";
    artwork_delete_ele.classList.add("btn","btn-primary");
    artwork_artworks_ele.addEventListener("click", async () => {
        await makeRequest(url+"/lists" ,"DELETE");
    });
    artwork_ele.appendChild(artwork_delete_ele);
    //append to the list div
    artwork_lists.appendChild(artwork_ele);
}
