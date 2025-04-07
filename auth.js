// Unified Authentication System
document.addEventListener('DOMContentLoaded', function() {
    // 1. Handle Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            if (email && password) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userEmail', email);
                window.location.href = 'quiz.html';
            } else {
                alert('Please fill all fields');
            }
        });
    }

    // 2. Handle Registration Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;

            if (name && email && password) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('userName', name);
                localStorage.setItem('userEmail', email);
                window.location.href = 'quiz.html';
            } else {
                alert('Please fill all fields');
            }
        });
    }

    // 3. Protect Quiz and Result Pages
    const protectedPages = ['quiz.html', 'result.html'];
    if (protectedPages.some(page => window.location.pathname.includes(page))) {
        if (!localStorage.getItem('isAuthenticated')) {
            window.location.href = 'login.html';
        }
    }

    // 4. Redirect if already logged in
    if (window.location.pathname.includes('login.html') || 
        window.location.pathname.includes('register.html')) {
        if (localStorage.getItem('isAuthenticated')) {
            window.location.href = 'quiz.html';
        }
    }
});