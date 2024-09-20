document.getElementById('registerButton').addEventListener('click', function() {
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const email = document.getElementById('email').value.trim();
    const confirmEmail = document.getElementById('confirmEmail').value.trim();
    const registerErrorMessage = document.getElementById('register-error-message');

    // Verificações
    if (newUsername === '' || newPassword === '' || confirmPassword === '' || email === '' || confirmEmail === '') {
        registerErrorMessage.textContent = 'Por favor, preencha todos os campos!';
        registerErrorMessage.style.display = 'block';
        return;
    }

    if (newPassword !== confirmPassword) {
        registerErrorMessage.textContent = 'As senhas não coincidem!';
        registerErrorMessage.style.display = 'block';
        return;
    }

    if (email !== confirmEmail) {
        registerErrorMessage.textContent = 'Os emails não coincidem!';
        registerErrorMessage.style.display = 'block';
        return;
    }

    alert('Cadastro realizado com sucesso!');
    document.getElementById('newUsername').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('email').value = '';
    document.getElementById('confirmEmail').value = '';
});
