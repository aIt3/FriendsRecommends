document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("FriendsRecommends JS imported successfully!");
  },
  false
);

const button = document.getElementById('thumbsUp');
button.addEventListener('click', function(e) {
  const postId=e.target.getAttribute('data-postId')

  fetch(`/clicked/${postId}/thumbsUp`, {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});

const button1 = document.getElementById('thumbsDown');
button1.addEventListener('click', function(e) {
  const postId=e.target.getAttribute('data-postId')

  fetch(`/clicked/${postId}/thumbsDown`, {method: 'POST'})
    .then(function(response) {
      if(response.ok) {
        console.log('click was recorded');
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function(error) {
      console.log(error);
    });
});