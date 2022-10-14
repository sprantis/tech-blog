// Code referenced from Module 14 - Mini Project
// Still needs to be implemented

const deleteCommentBtnHandler = async (event) => {
    event.preventDefault();

    const commentId = event.target.getAttribute('data-id');
    
    const response = await fetch(`/api/comments${commentId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
};

// document.querySelector('#delete-comment-btn').addEventListener('click', deleteCommentBtnHandler);