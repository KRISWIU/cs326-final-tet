//import * as addpage from 'gotoPages.js';

const baseURL = "https://the-artchive.herokuapp.com";
const localBaseURL = "http://localhost:8000";

// Test code for HTTP requests: might be a better way

async function makeRequest(url, method) {
    const response = await fetch(url, { method: method });
    // console.log("Initial response is: " + response);
    const responsejson = await response.json();
    // console.log("Response inside of makeRequest is: " + responsejson);
    return responsejson;
}

// On page start, try to add event listener to searchBar 
window.onload = () => {
    
    // Search bar event
    document.getElementById("searchBar").addEventListener("click", async () => {
        const searchBarElem = document.getElementById("searchBar");
        const searchKey = searchBarElem.value;
        const URL = localBaseURL + "/artworks"; // This will only work locally!!!
        // For the actual server, use: "https://the-artchive.herokuapp.com/artworks/" + artworkName
        
        // Print out the value using IIFE
        (async () => {
            const returnObj = await makeRequest(URL, "POST"); 
            console.log("The response object is: " + JSON.stringify(returnObj)); })();  
    });
    // End of event listener

    document.getElementById("loginProfileButton").addEventListener("click", async ()=>{
        const loginBut = document.getElementById("loginProfileButton");
        const userName = loginBut.value;
        const URL = localBaseURL + "/users/:" + userName;

        (async () => {
            const returnObj = await makeRequest(URL, "POST"); 
            console.log("The response object is: " + JSON.stringify(returnObj)); })();  
    });

    document.getElementById("filterMenu").addEventListener("click", async ()=>{
        const tags = document.getElementById("tags");
        const creators = document.getElementById("creators");
        let URL = '';
        if (tags.value!==null && creators.value!==null){
            URL = localBaseURL + "/tags/creators/:" + creators.value;
        }else if(tags.value!==null){
            URL = localBaseURL + "/tags/:" + tags.value;
        }else if(creators.value!==null){
            URL = localBaseURL + "/tags/creators/:" + creators.value;
        }

        (async () => {
            const returnObj = await makeRequest(URL, "POST"); 
            console.log("The response object is: " + JSON.stringify(returnObj)); })();  
    });

    document.getElementById("siteName").addEventListener("click", gotoMainPage());
    document.getElementById('addWork').addEventListener('click', gotoAddWork());
};