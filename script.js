function navigateTo(url) {
    window.location.href = url;
}

function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        alert('이미 가입된 이메일입니다.');
        return;
    }

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('회원가입이 완료되었습니다!');
    navigateTo('login.html');
}

function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert(`${user.name}님, 환영합니다!`);
        navigateTo('main.html');
    } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    alert("로그아웃 되었습니다.");
    navigateTo('index.html');
}

document.addEventListener('DOMContentLoaded', () => {
    const nameDisplay = document.getElementById('userNameDisplay');

    if (nameDisplay) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            nameDisplay.innerText = currentUser.name;
        } else {
            alert("로그인이 필요합니다.");
            navigateTo('login.html');
        }
    }
});
