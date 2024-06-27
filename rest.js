document.addEventListener('DOMContentLoaded', function() {
    const outputContainer = document.getElementById('output');

    // Function to clear previous results
    function clearResult() {
        outputContainer.innerHTML = '';
    }

    // Function to fetch data from API and handle response
    async function fetchData(url, options = {}) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return { error: 'Error fetching data' };
        }
    }

    // Function to render JSON data to HTML
    function renderDataToHtml(data) {
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('card', 'mb-3');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const pre = document.createElement('pre');
        pre.textContent = JSON.stringify(data, null, 2);

        cardBody.appendChild(pre);
        resultDiv.appendChild(cardBody);

        outputContainer.appendChild(resultDiv);
    }

    // Event listeners for each button

    // Get all posts
    document.getElementById('getAllPosts').addEventListener('click', async function() {
        clearResult();
        const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
        renderDataToHtml(posts);
    });

    // Get post by ID 10
    document.getElementById('getPostByIdOfTen').addEventListener('click', async function() {
        clearResult();
        const post = await fetchData('https://jsonplaceholder.typicode.com/posts/10');
        renderDataToHtml(post);
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
        renderDataToHtml(createdPost);
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
        renderDataToHtml(replacedPost);
    });

    // Update title of post with ID 12
    document.getElementById('updatePost').addEventListener('click', async function() {
        clearResult();
        const updatedTitle = {
            title: 'Updated Title',
        };
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTitle)
        };
        const updated = await fetchData('https://jsonplaceholder.typicode.com/posts/12', options);
        renderDataToHtml(updated);
    });

    // Delete post with ID 12
    document.getElementById('deletePost').addEventListener('click', async function() {
        clearResult();
        const options = {
            method: 'DELETE'
        };
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/12', options);
            if (!response.ok) {
                throw new Error('Failed to delete post');
            }
            renderDataToHtml({ message: 'Post with ID 12 deleted successfully.' });
        } catch (error) {
            console.error('Error deleting post:', error);
            renderDataToHtml({ error: 'Failed to delete post with ID 12.' });
        }
    });
});
