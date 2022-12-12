//import * as addpage from 'gotoPages.js';

// This is the version for heroku: change this to false if testing locally.
const isLocalVersion = true;
let baseURL = "";
if (isLocalVersion === true) { 
    baseURL = "https://the-artchive.herokuapp.com";
} else {
    baseURL = "http://localhost:5000";
}


// Simple function code to simplify making requests
async function makeRequest(url, method) {
    const response = await fetch(url, { method: method });
    const responsejson = await response.json();
    return responsejson;
}

// On page start, try to add event listener to searchBar 
window.onload = () => {
    

    // Search bar event
    // Has to be updated to take the enter key or function upon a "search" button being pressed
    document.getElementById("searchBar").addEventListener("click", async () => {
        const searchBarElem = document.getElementById("searchBar");
        const searchKey = searchBarElem.value;
        const URL = baseURL + "/artworks";
        
        // BASIC TEST CODE: DO NOT INCLUDE IN MAIN BRANCH

        const testURL = baseURL + "/artworks/1?key=tags&type=push&value=4"
        const responseObj = await makeRequest(testURL, "PUT");
        console.log(JSON.stringify(responseObj));

        /* (async () => {
            const returnObj = await makeRequest(URL, "POST"); 
            console.log("The response object is: " + JSON.stringify(returnObj)); })();*/  
    });
    // End of search bar event

    
    // Login button event
    document.getElementById("loginProfileButton").addEventListener("click", async ()=>{
        const loginBut = document.getElementById("loginProfileButton");
        const userName = loginBut.value;
        const URL = baseURL + "/users/:" + userName;

        (async () => {
            const returnObj = await makeRequest(URL, "POST"); 
            console.log("The response object is: " + JSON.stringify(returnObj)); })();  
    });
    // End of login button event

    
    // Filter menu button event: should be updating and maintaining a query object
    document.getElementById("filterMenu").addEventListener("click", async ()=>{
        const tags = document.getElementById("tags");
        const creators = document.getElementById("creators");
        let URL = '';
        if (tags.value!==null && creators.value!==null){
            URL = baseURL + "/tags/creators/:" + creators.value;
        } else if(tags.value!==null){
            URL = baseURL + "/tags/:" + tags.value;
        } else if(creators.value!==null){
            URL = baseURL + "/tags/creators/:" + creators.value;
        }

        (async () => {
            const returnObj = await makeRequest(URL, "POST"); 
            console.log("The response object is: " + JSON.stringify(returnObj)); })();
    });
}
