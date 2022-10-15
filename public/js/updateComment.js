// Code referenced from Module 14 - Mini Project
// Still needs to be implemented


const updateCommentFormHandler = async (event) => {
    event.preventDefault();

    const commentId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const commentText = document.querySelector('textarea[name="comment-text"]').value.trim();

    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({
            commentText
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
        document.location.replace('/dashboard');
    }
}

document.querySelector('#update-comment-form').addEventListener('submit', updateCommentFormHandler);

