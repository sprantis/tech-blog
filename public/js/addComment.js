// Code referenced from Module 14 - Mini Project

const addCommentFormHandler = async (event) => {
    event.preventDefault();

    // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const commentText = document.querySelector('textarea[name="comment-text"]').value.trim();

    if (commentText) {
        const response = await fetch('/api/comments', {
            method: 'POST',
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

document.querySelector('#add-comment-form').addEventListener('submit', addCommentFormHandler);

