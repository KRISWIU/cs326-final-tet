const baseURL = "http://localhost:5000";

async function makeRequest(url, method) {
    const response = await fetch(url, { method: method });
    const responsejson = await response.json();
    return responsejson;
}

window.onload = () => {
    
    // Try to create a new user 
    document.getElementById("loginButton").addEventListener("click", async () => {
        const username = document.getElementById("usernameForm").value;
        const password = document.getElementById("passwordForm").value;
        // Not using the reenter password form for now
        const requestURL = baseURL + "/users/" + username + "&password=" + password;
        console.log(requestURL);
        const request = await makeRequest(requestURL, "POST");

        // Printing feedback to the user
        const feedbackArea = document.getElementById("feedback");
        if (Object.keys(request).includes("error")) {
            feedbackArea.innerHTML = request.error;
        } else {
            feedbackArea.innerHTML = "You have been logged in.";
        }
    });


};