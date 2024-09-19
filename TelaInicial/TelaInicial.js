// TelaInicial.js

document.querySelector('button').addEventListener('click', function() {
    const textarea = document.querySelector('#postTextarea');
    const postContent = textarea.value;

    if (postContent.trim()) {
        const newPost = document.createElement('div');
        newPost.classList.add('post');
        
        // Obtém a data e hora atual
        const now = new Date();
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
        const formattedDate = now.toLocaleString('pt-BR', options);

        newPost.innerHTML = `<p><strong>Você:</strong> ${postContent} <span class="timestamp">${formattedDate}</span></p>`;
        document.querySelector('.posts').prepend(newPost);
        textarea.value = ''; // Limpa o textarea após publicar
    }
});
