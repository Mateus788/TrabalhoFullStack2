document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    displayWelcomeMessage();
});

function displayWelcomeMessage() {
    const username = localStorage.getItem('username');
    const welcomeMessage = document.getElementById('welcome-message');

    if (username) {
        welcomeMessage.textContent = `Bem-vindo, ${username}!`;
        welcomeMessage.style.display = 'block'; // Certifique-se de que o elemento esteja visível
    }
}

document.querySelector('button').addEventListener('click', function() {
    const textarea = document.querySelector('#postTextarea');
    const postContent = textarea.value.trim();
    const errorMessage = document.getElementById('error-message');

    if (postContent === '') {
        errorMessage.textContent = 'O post não pode estar vazio!';
        errorMessage.style.display = 'block';
        return;
    }

    if (postContent.length > 280) {
        errorMessage.textContent = 'O post excede o limite de 280 caracteres!';
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    const newPost = createPostElement(postContent);
    document.querySelector('.posts').prepend(newPost);
    savePostToLocalStorage(postContent);

    textarea.value = '';
});

function createPostElement(content) {
    const newPost = document.createElement('div');
    newPost.classList.add('post');

    const now = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedDate = now.toLocaleString('pt-BR', options);

    newPost.innerHTML = `
        <p><strong>Você:</strong> ${content} <span class="timestamp">${formattedDate}</span></p>
        <button class="like-button"><i class="fas fa-thumbs-up"></i></button>
        <button class="dislike-button"><i class="fas fa-thumbs-down"></i></button>
        <span class="like-count">0</span>
        <div class="comments-section">
            <textarea class="comment-input" placeholder="Adicione um comentário..." maxlength="280"></textarea>
            <button class="comment-button">Comentar</button>
            <div class="comments"></div>
        </div>
    `;

    addPostEventListeners(newPost);

    return newPost;
}

function addPostEventListeners(post) {
    let likeCount = 0;

    post.querySelector('.like-button').addEventListener('click', function() {
        likeCount++;
        post.querySelector('.like-count').innerText = likeCount;
    });

    post.querySelector('.dislike-button').addEventListener('click', function() {
        if (likeCount > 0) {
            likeCount--;
            post.querySelector('.like-count').innerText = likeCount;
        }
    });

    post.querySelector('.comment-button').addEventListener('click', function() {
        const commentTextarea = post.querySelector('.comment-input');
        const commentContent = commentTextarea.value.trim();

        if (commentContent) {
            const comment = createCommentElement(commentContent);
            post.querySelector('.comments').prepend(comment);
            commentTextarea.value = '';
        }
    });
}

function createCommentElement(content, isNested = false) {
    const comment = document.createElement('div');
    comment.classList.add(isNested ? 'nested-comment' : 'comment');

    const now = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const formattedDate = now.toLocaleString('pt-BR', options);

    comment.innerHTML = `
        <p><strong>${isNested ? 'Resposta:' : 'Comentário:'}</strong> ${content} <span class="timestamp">${formattedDate}</span></p>
        <button class="like-button"><i class="fas fa-thumbs-up"></i></button>
        <button class="dislike-button"><i class="fas fa-thumbs-down"></i></button>
        <span class="like-count">0</span>
        <div class="nested-comments">
            <textarea class="nested-comment-input" placeholder="Adicione uma resposta..." maxlength="280"></textarea>
            <button class="nested-comment-button">Comentar</button>
        </div>
        <div class="comments"></div>
    `;

    addCommentEventListeners(comment);

    return comment;
}

function addCommentEventListeners(comment) {
    let likeCount = 0;

    comment.querySelector('.like-button').addEventListener('click', function() {
        likeCount++;
        comment.querySelector('.like-count').innerText = likeCount;
    });

    comment.querySelector('.dislike-button').addEventListener('click', function() {
        if (likeCount > 0) {
            likeCount--;
            comment.querySelector('.like-count').innerText = likeCount;
        }
    });

    comment.querySelector('.nested-comment-button').addEventListener('click', function() {
        const nestedCommentTextarea = comment.querySelector('.nested-comment-input');
        const nestedCommentContent = nestedCommentTextarea.value.trim();

        if (nestedCommentContent) {
            const nestedComment = createCommentElement(nestedCommentContent, true);
            comment.querySelector('.comments').prepend(nestedComment);
            nestedCommentTextarea.value = '';
        }
    });
}

function savePostToLocalStorage(content) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(content);
    localStorage.setItem('posts', JSON.stringify(posts));
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.forEach(content => {
        const post = createPostElement(content);
        document.querySelector('.posts').prepend(post);
    });
}
