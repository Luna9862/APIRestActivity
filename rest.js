// Function to fetch data from JSONPlaceholder API
function fetchData(url, options = {}) {
    return fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
}

// Function to render JSON data to HTML
function renderDataToHtml(data) {
    const outputContainer = document.getElementById('output');
    outputContainer.innerHTML = JSON.stringify(data, null, 2); // Convert JSON to string with indentation for readability
}

// Function to hide the results
function hideResults() {
    const outputContainer = document.getElementById('output');
    outputContainer.innerHTML = '';
}

// Get all posts
document.getElementById('getAllPosts').addEventListener('click', function() {
    hideResults();
    fetchData('https://jsonplaceholder.typicode.com/posts')
      .then(data => renderDataToHtml(data));
});

// Get post with id of 10
document.getElementById('getPostByIdOfTen').addEventListener('click', function() {
    hideResults();
    fetchData('https://jsonplaceholder.typicode.com/posts/10')
      .then(data => renderDataToHtml(data));
});

// Create a new post and log the id generated for it by the server
document.getElementById('createNewPost').addEventListener('click', function() {
    hideResults();
    const newPost = {
      title: 'New Post Title',
      body: 'This is the body of the new post.',
      userId: 1 // Replace with desired userId
    };

    fetchData('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    .then(data => {
      renderDataToHtml(data); // Display the response data
    });
});

// Replace the post with id of 12 and render the response JSON
document.getElementById('replacePost').addEventListener('click', function() {
    hideResults();
    const updatedPost = {
      title: 'Updated Post Title',
      body: 'This is the updated body of the post.',
      userId: 1 // Replace with desired userId
    };

    fetchData('https://jsonplaceholder.typicode.com/posts/12', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPost)
    })
    .then(data => renderDataToHtml(data));
});

// Update the title of post with id of 12 and render response JSON
document.getElementById('updatePost').addEventListener('click', function() {
    hideResults();
    const updatedTitle = {
      title: 'Updated Post Title'
    };

    fetchData('https://jsonplaceholder.typicode.com/posts/12', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTitle)
    })
    .then(data => renderDataToHtml(data));
});

// Delete the post with id of 12 and render a success message
document.getElementById('deletePost').addEventListener('click', function() {
    hideResults();
    fetchData('https://jsonplaceholder.typicode.com/posts/12', {
      method: 'DELETE'
    })
    .then(() => {
      renderDataToHtml({ message: 'Post with id 12 has been successfully deleted.' });
    });
});
