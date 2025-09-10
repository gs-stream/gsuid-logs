const loginDiv = document.getElementById('loginDiv');
const mainUI = document.getElementById('mainUI');
let token = null;

// Login
document.getElementById('loginBtn').onclick = async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('https://YOUR_BACKEND_URL/api/login', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({username, password})
    });
    const data = await res.json();
    if (data.success) {
        token = data.token;
        loginDiv.style.display = 'none';
        mainUI.style.display = 'block';
    } else {
        document.getElementById('loginMsg').innerText = data.message;
    }
};

// Ambil UID
document.getElementById('ambilBtn').onclick = async () => {
    const res = await fetch('https://YOUR_BACKEND_URL/api/uid', {
        headers:{'Authorization': token}
    });
    const data = await res.json();
    document.getElementById('threads').value = data.uids.join('\n');
};
