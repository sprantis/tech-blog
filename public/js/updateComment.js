// Code referenced from Module 14 - Mini Project
// Still needs to be implemented


const updateCommentFormHandler = async (event) => {
    event.preventDefault();

    const commentId = event.target.getAttribute('data-id');

    const commentText = document.querySelector('textarea[name="comment-text"]').value.trim();

    if (commentText) {
        const response = await fetch(`/api/comments${commentId}`, {
            method: 'PUT',
            body: JSON.stringify({
                postId,
                commentText
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    };
}

// document.querySelector('#update-comment-form').addEventListener('submit', updateCommentFormHandler);

