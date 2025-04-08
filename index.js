$(document).ready(() => {
  const $body = $('body');
  const $tweetHolder = $('<div>'); // Create a container for tweets
  const $msgBtn = $('<button>').text('Listen for incoming transmissions');

  $body.prepend($msgBtn, $tweetHolder);

  let generateTweets = (currentUser) => {


    // Map over streams.home to generate tweets
    currentUser.map((tweet) => {

      const tweets = currentUser ? streams.users[currentUser] : streams.home;
      $tweetContainer.html('')


      tweets.forEach((tweet) => {
        const $tweet = $('<p></p>'); // Create a paragraph element for each tweet
  
        // Create a clickable username element
        const $userName = $('<a></a>')
          .text(`@${tweet.user}`) // Set the username text
          .addClass('username') // Add class
          .click(function(e) {
            $body.html('')
            generateTweets(tweet.user);
          })
          
          $tweet.append($userName) // Add the username
                .append(`:  ${tweet.message}`) // Add the message
                .append($('<span></span>').text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a'))); // Add the timestamp
      })



      // Append all elements to the tweet (username, message, and timestamp)

      // Prepend the tweet to the container
      $tweetHolder.prepend($tweet);
    });
  };

  // Listen for button clicks to generate new tweets
  $msgBtn.click(function () {
    generateTweets(); // Generate new tweets
  });

generateTweets();





});

