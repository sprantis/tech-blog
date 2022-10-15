// Code referenced from Module 14 - Mini Project
// Still needs to be implemented

const deleteCommentBtnHandler = async (event) => {
    event.preventDefault();

    const commentId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
        document.location.replace('/dashboard');
    }
};

document.querySelector('#delete-comment-btn').addEventListener('click', deleteCommentBtnHandler);