

window.onload = () => {
    
    // Try to create a new user 
    document.getElementById("signUpButton").addEventListener("click", async () => {
        const username = document.getElementById("usernameForm").value;
        const password = document.getElementById("passwordForm").value;
        // Not using the reenter password form for now
        console.log("Username is " + username + " and password is " + password);
        const requestURL = baseURL + "/users?username=" + username + "&password=" + password;
        console.log(requestURL);
        const request = await makeRequest(requestURL, "POST");

        // Printing feedback to the user
        const feedbackArea = document.getElementById("feedback");
        if (Object.keys(request).includes("error")) {
            feedbackArea.innerHTML = request.error;
        } else {
            feedbackArea.innerHTML = "Your new user was created!";
        }
    });


};