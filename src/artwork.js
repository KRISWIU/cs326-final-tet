const isLocalVersion = true;
let baseURL = "";
if (isLocalVersion === true) { 
    baseURL = "https://the-artchive.herokuapp.com";
} else {
    baseURL = "http://localhost:8000";
}

async function makeRequest(url, method) {
    const response = await fetch(url, { method: method });
    const responsejson = await response.json();
    return responsejson;
}

const artworkID = "1";//change this, test use
const url = "/artworks/"+artworkID;
const artwork_result = await makeRequest(url,"GET");


const artwork_title = artwork_result["title"];
const artwork_links = artwork_result["links"];
const artwork_img = artwork_result["img"];
const artwork_creator = artwork_result["creator"];
const artwork_tag = artwork_result["tags"];
let artwork_tag_str = "";
for (let i = 0; i<artwork_tag.length; i++){
    const tag_url = "/tags/id/"+artwork_tag[i];
    const tag_str = await makeRequest(tag_url,"GET");
    artwork_tag_str += ";"+tag_str;
}

const artwork_title_ele = document.getElementById("art_name");
const artwork_img_ele = document.getElementById("art_img");
const artwork_links_ele = document.getElementById("detail");
const artwork_creator_ele = document.getElementById("art_author");
const artwork_tag_ele = document.getElementById("art_tag");

artwork_title_ele.innerHTML = "Title: "+artwork_title;
artwork_img_ele.src = artwork_img;
artwork_creator_ele.innerHTML = "Creator: "+artwork_creator;
artwork_links_ele.innerHTML = artwork_links;
artwork_tag_ele.innerHTML = "Tags: "+artwork_tag_str;

const artwork_add_tag_ele = document.getElementById("art_add_tag").innerHTML;
const artwork_add_tag_b = document.getElementById("art_add_tag_b");
const artwork_de_tag_ele = document.getElementById("art_de_tag").innerHTML;
const artwork_de_tag_b = document.getElementById("art_de_tag_b");
const artwork_add_list_ele = document.getElementById("art_add_list").innerHTML;
const artwork_add_list_b = document.getElementById("art_add_list_b");

artwork_add_tag_b.addEventListener("click", async ()=>{
    const add_tag_url = "artwork/"+artworkID+"?key=tag&type=push&value="+artwork_add_tag_ele;
    await makeRequest(add_tag_url,"PUT")
});

artwork_de_tag_b.addEventListener("click", async ()=>{
    const de_tag_url = "artwork/"+artworkID+"?key=tag&type=pull&value="+artwork_add_tag_ele;
    await makeRequest(de_tag_url,"PUT")
});

artwork_add_list_b.addEventListener("click", async ()=>{
    const userName = document.getElementById("loginProfileButton").innerHTML;
    const add_list_url = "users/"+userName+"/lists/"+artwork_add_list_ele+"?add=false&artwork="+artworkID;
    await makeRequest(add_list_url,"PUT")
});