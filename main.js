const firebaseConfig = {
    apiKey: "YOUR_GOOGLE_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById('login-button').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        window.location.href = 'dashboard.html';
    }).catch((error) => {
        console.log(error.message);
    });
});

document.getElementById('logout-button').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'index.html';
    });
});

document.getElementById('user-input').addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const userInput = e.target.value;
        const response = await fetch('/getAIResponse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: userInput })
        });
        const result = await response.json();
        document.getElementById('messages').innerHTML += `<div class="ai-response">${result.response}</div>`;
    }
});
