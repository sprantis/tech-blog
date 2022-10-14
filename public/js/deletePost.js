// Code referenced from Module 14 - Mini Project

const deletePostBtnHandler = async function(event) {
    event.preventDefault();

    // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

    document.location.replace('/dashboard');
}

document.querySelector('#delete-post-btn').addEventListener('click', deletePostBtnHandler);