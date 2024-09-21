document.getElementById('loginButton').addEventListener('click', function() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMessage = document.getElementById('login-error-message');

    if (username === '' || password === '') {
        errorMessage.textContent = 'Por favor, preencha todos os campos!';
        errorMessage.style.display = 'block';
        return;
    }

    // Armazenar o nome do usuário no localStorage
    localStorage.setItem('username', username);

    alert('Login realizado com sucesso!'); // Simulação de login
    // Redireciona para a tela inicial
    window.location.href = "../TelaInicial/index.html"; // Ajuste o caminho se necessário
});

document.getElementById('showRegisterForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.login-form').style.display = 'none';
    document.querySelector('.register-form').style.display = 'block';
});

document.getElementById('showLoginForm').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.register-form').style.display = 'none';
    document.querySelector('.login-form').style.display = 'block';
});

document.getElementById('registerButton').addEventListener('click', function() {
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const email = document.getElementById('email').value.trim();
    const registerErrorMessage = document.getElementById('register-error-message');

    if (newUsername === '' || newPassword === '' || email === '') {
        registerErrorMessage.textContent = 'Por favor, preencha todos os campos!';
        registerErrorMessage.style.display = 'block';
        return;
    }

    alert('Cadastro realizado com sucesso!');
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('email').value = '';
});
