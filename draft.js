document.addEventListener('DOMContentLoaded', function() {
    const resultDiv = document.getElementById('output');

    // Function to clear previous results
    function clearResult() {
        resultDiv.innerHTML = '';
    }

    // Function to fetch data from API and handle response
    async function fetchData(url, options = {}) {
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return { error: 'Error fetching data' };
        }
    }

    // Event listeners for each button

    // Get all posts
    document.getElementById('getAllPosts').addEventListener('click', async function() {
        clearResult();
        const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
        resultDiv.innerHTML = JSON.stringify(posts, null, 2);
    });

    // Get post by ID 10
    document.getElementById('getPostByIdOfTen').addEventListener('click', async function() {
        clearResult();
        const post = await fetchData('https://jsonplaceholder.typicode.com/posts/10');
        resultDiv.innerHTML = JSON.stringify(post, null, 2);
    });

    // Create a new post
    document.getElementById('createNewPost').addEventListener('click', async function() {
        clearResult();
        const newPost = {
            title: 'New Post Title',
            body: 'This is the body of the new post',
            userId: 1 // Adjust userId as needed
        };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        };
        const createdPost = await fetchData('https://jsonplaceholder.typicode.com/posts', options);
        resultDiv.innerHTML = `New post created with ID: ${createdPost.id}`;
    });

 // Replace post with ID 12
document.getElementById('replacePost').addEventListener('click', async function() {
    clearResult();
    const updatedPost = {
        id: 12,
        title: 'Updated Post Title',
        body: 'This is the updated body of the post',
        userId: 1 // Adjust userId as needed
    };
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPost)
    };
    const replacedPost = await fetchData('https://jsonplaceholder.typicode.com/posts/12', options);
    resultDiv.innerHTML = JSON.stringify(replacedPost, null, 2);
});


    // Update title of post with ID 12
    document.getElementById('updatePost').addEventListener('click', async function() {
        clearResult();
        const updatedPost = {
            title: 'Updated Title',
        };
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPost)
        };
        const updated = await fetchData('https://jsonplaceholder.typicode.com/posts/12', options);
        resultDiv.innerHTML = JSON.stringify(updated, null, 2);
    });

    // Delete post with ID 12
    document.getElementById('deletePost').addEventListener('click', async function() {
        clearResult();
        const options = {
            method: 'DELETE'
        };
        const response = await fetchData('https://jsonplaceholder.typicode.com/posts/12', options);
        if (response.ok) {
            resultDiv.innerHTML = 'Post with ID 12 deleted successfully';
        } else {
            resultDiv.innerHTML = 'Failed to delete post with ID 12';
        }
    });
});
