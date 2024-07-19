/*
 - Client-side JS logic goes here
 -jQuery is already loaded
 - Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


    


$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    // Your code for creating the tweet element
    const time = timeago.format(tweet.created_at);
    const safeText = escape(tweet.content.text); // Use escape function here

    const $tweet = $(`
      <article class="tweet">
            
            <!--Header for the tweet container-->
            <header class="tweet-header">
              <div>
                 <span><img src="${escape(tweet.user.avatars)}" alt="no image"> ${escape(tweet.user.name)}</span>
                 <span>${escape(tweet.user.handle)}</span>
              </div>
              
            </header>
  
            <div class="tweet-text">
              <span> ${safeText}</span>
              <hr>
           </div>
           
  
            <!---Footer for the tweet container-->
            <footer>
              <div class="time-stamp">
                  <span>${time} </span>
              </div>
              <div class="icons">
                  <i class="fa-solid fa-flag"></i>
                  <i class="fa-solid fa-retweet"></i>
                  <i class="fa-solid fa-heart"></i>
              </div>
          </footer>
      
      </article>
    `);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    // loops through tweets
    tweets.forEach(tweet => {
      // calls createTweetElement for each tweet
      const tweetElement = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend(tweetElement);
    });
  }

  

  const loadTweets = function() {
    $.ajax({
      method : 'GET',
      url :'/tweets',
      success : (dataFromServer) =>{
        console.log(dataFromServer);
        renderTweets(dataFromServer);
      }
    })

  }

  loadTweets();

  //Grab the new tweet from the form
  const $form = $('#new-tweet-form');

  //listen for submit event of form
  //submit enent handler
  $form.on('submit', (event)=>{
    event.preventDefault();
    console.log("form submitted")
    const tweetText = $('#tweet-text').val().trim();
    const $errorMessage = $('#error-message');

    if (tweetText.length === 0) {
      $errorMessage.text("Error: Tweet content cannot be empty.").slideDown();
      return;
    }

    if (tweetText.length > 140) {
      $errorMessage.text("Error: Tweet content is too long. Maximum length is 140 characters.").slideDown();
      return;
    }

    $errorMessage.slideUp();
          
    
    ///grab the form data
    //create a url -encoded string for post to send
    const formData = $form.serialize();
    //POST the form information to the server
  $.ajax({
    method:'POST',
    url:'/tweets',
    data: formData,
    success:(response)=>{// Fetch the latest tweet only and prepend it
      $('#tweets-container').empty();


    loadTweets();
    // Clear the form
    $('#tweet-text').val('');
    $('output.counter').text('140');
  },
  error: (error) => {
    alert("Error: Unable to post the tweet. Please try again later.");
  }

  });

}); 
  
});



