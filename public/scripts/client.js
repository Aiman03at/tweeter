/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 

//Tweet object///

/*const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]*/





$(document).ready(function() {


  const createTweetElement = function(tweet) {
    // Your code for creating the tweet element
    const time = timeago.format(tweet.created_at);
    const $tweet = $(`
      <article class="tweet">
            
            <!--Header for the tweet container-->
            <header class="tweet-header">
              <div>
                 <span><img src="${tweet.user.avatars}" alt="no image"> ${tweet.user.name}</span>
                 <span>${tweet.user.handle}</span>
              </div>
              
            </header>
  
            <div class="tweet-text">
              <span> ${tweet.content.text}</span>
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
    const tweetText = $('#tweet-text').val();

          if (tweetText.trim().length === 0) {
            alert("Error: Tweet content cannot be empty.");
            return;
          }

          if (tweetText.trim.length > 140) {
            alert("Error: Tweet content is too long. Maximum length is 140 characters.");
            return;
          }

          
    
    ///grab the form data
    //create a url -encoded string for post to send
    const formData = $form.serialize();
    //POST the form information to the server
  $.ajax({
    method:'POST',
    url:'/tweets',
    data: formData,
    success:(response)=>{// Fetch the latest tweet only and prepend it
    $.ajax({
      method: 'GET',
      url: '/tweets',
      success: (dataFromServer) => {
        const newTweet = dataFromServer[dataFromServer.length - 1];
        const tweetElement = createTweetElement(newTweet);
        $('#tweets-container').prepend(tweetElement);
      }
    });
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



