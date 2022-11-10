//import * as addpage from 'gotoPages.js';
//nav bar js code

// document.getElementById("siteName").addEventListener("click", gotoMainPage());
// document.getElementById('addWork').addEventListener('click', gotoAddWork());

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
};