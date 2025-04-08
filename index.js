$(document).ready(() => {
  const $body = $('body');
  const $tweetHolder = $('<div>'); // Create a container for tweets
  const $msgBtn = $('<button>').text('Listen for incoming transmissions');

  $body.prepend($msgBtn, $tweetHolder);

  let generateTweets = (currentUser) => {


    // Map over streams.home to generate tweets
    currentUser.map((tweet) => {
      const $tweet = $('<p></p>'); // Create a paragraph element for each tweet

      // Create a clickable username element
      const $userName = $('<a></a>')
        .text(`@${tweet.user}`) // Set the username text
        .addClass('username') // Add class
        .click(function(e) {
          $body.html('')
          generateTweets(`${tweet.user}`)
        })


      //the tweet message
      const $twid = `${tweet.message}`;

      // Append all elements to the tweet (username, message, and timestamp)
      $tweet.append($userName) // Add the username
            .append(`: ${$twid} `) // Add the message
            .append($('<span></span>').text(moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a'))); // Add the timestamp

      // Prepend the tweet to the container
      $tweetHolder.prepend($tweet);
    });
  };

  // Listen for button clicks to generate new tweets
  $msgBtn.click(function () {
    $tweetHolder.html(''); // Clear previous tweets
    generateTweets(); // Generate new tweets
  });







});

