/**
 * Navigates to a specific URL.
 * This function is called via inline onclick attributes in the HTML.
 * @param {string} url - The destination URL.
 */
function navigateTo(url) {
    window.location.href = url;
}

/**
 * Handles the signup form submission.
 * Collects data from the form and saves it to LocalStorage.
 * @param {Event} event - The form submission event.
 */
function handleSignup(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic password validation
    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    // Create user object
    const userData = {
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };

    // Save to LocalStorage
    // We'll store it as an array of users
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
        alert('이미 가입된 이메일입니다.');
        return;
    }

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));

    alert('회원가입이 완료되었습니다!');
    navigateTo('login.html');
}
