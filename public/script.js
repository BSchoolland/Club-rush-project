// script.js

const displayMessages = function(messages){
    for (i in messages){
        document.getElementById('message').innerHTML += `
        <div class="message">
        <p>${messages[i].username || 'guest'}:</p>
        <p>${messages[i].text}</p>
        </div>
        ` 
    }
}


window.onload = function () {
    if (window.location.pathname === '/send-message') {
        window.location.href = '/';
    }
    // fill in the username with the username from local storage
    document.getElementById('username').value = localStorage.getItem('username');
    console.log('username:', localStorage.getItem('username'));

    // Get all messages from the server
    fetch('/get-messages')
        .then(response => response.text())
        .then(data => {
            // Display the response on the web page
            const json = JSON.parse(data);
            displayMessages(json.messages)
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        // Scroll to the bottom of the page
        function scrollToBottom() {
            window.scrollTo(0, document.body.scrollHeight);
        }
        
        // Call the scrollToBottom function after a delay (e.g., 1000 milliseconds)
        setTimeout(scrollToBottom, 500);
    
};


// Function to handle form submission
function handleSubmit(event, endpoint) {
    event.preventDefault();
    fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
            username: document.getElementById('login-username').value,
            password: document.getElementById('login-password').value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.text())
        .then(data => {
            // Display the response on the web page
            const json = JSON.parse(data);
            console.log(json);
            if (json.success) {
                localStorage.setItem('username', json.username);
                alert('success! You are now signed in as ' + json.username + '.');
                window.location.href = '/';
            }
            else {
                alert(json.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Add event listeners for the login and signup buttons
document.getElementById('login-button').addEventListener('click', function (event) {
    handleSubmit(event, '/login');
});

document.getElementById('signup-button').addEventListener('click', function (event) {
    handleSubmit(event, '/signup'); // Change the endpoint to your signup endpoint
});