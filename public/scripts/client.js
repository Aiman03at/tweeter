/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 

//Tweet object///

const data = [
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
]


const renderTweets = function(tweets) {
  // loops through tweets
  tweets.forEach(tweet => {
    // calls createTweetElement for each tweet
    const tweetElement = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend(tweetElement);
  });
}

const createTweetElement = function(tweet) {
  // Your code for creating the tweet element
  const timeAgo = (Date.now() - tweet.created_at) / (1000 * 60 * 60 * 24);
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
                <span>${Math.floor(timeAgo)} days ago</span>
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
}
$(document).ready(function() {
  renderTweets(data);
});

