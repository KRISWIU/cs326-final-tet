//const baseURL = "https://the-artchive.herokuapp.com";
const baseURL = "http://localhost:5000";

async function makeRequest(url, method) {
    const response = await fetch(url, { method: method });
    const responsejson = await response.json();
    return responsejson;
}

window.onload = () => {
    
    // Try to create a new user 
    document.getElementById("signUpButton").addEventListener("click", async () => {
        const username = document.getElementById("usernameForm").value;
        const password = document.getElementById("passwordForm").value;
        // Not using the reenter password form for now
        console.log("Username is " + username + " and password is " + password);
        const requestURL = baseURL + "/users?username=" + username + "&password=" + password;
        console.log(requestURL);
        await makeRequest(requestURL, "POST");
    });


};