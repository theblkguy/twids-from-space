 $(document).ready(() => {
  const $body = $('body');
  $body.html(''); // Clear the body


  const $tweetContainer = $('<div>'); // Create a container for tweets
  $body.prepend($tweetContainer);

  const $tweeterDiv = $('<div>'); // Create message input div
  $body.prepend($tweeterDiv);

  const $userBox = $('<input>')
  .attr('name', 'username')
  .attr('placeholder', 'username')
  .attr('id', 'visitorUsername');
  
  const $tweetBox = $('<input>') // create space to write tweets
  .attr('name', 'tweet')
  .attr('placeholder', 'tweet here')
  .attr('id', 'visitorTweet');
  
  const $tweetBtn = $('<button>')
  .text('broadcast a signal')
  .click(function(e){
    var visitingUser = $('#visitorUsername').val();
    window.visitor = `${visitingUser}`;
    streams.users[`${visitingUser}`] = [];
    var composedTweet = $('#visitorTweet').val();
    writeTweet(composedTweet);
    $tweetContainer.html(''); // Clear previous tweets
    generateTweets(); // Generate new tweets
  });

    $tweeterDiv.prepend($tweetBox);
    $tweeterDiv.prepend($userBox)
    $tweeterDiv.prepend($tweetBtn);



  const $msgBtn = $('<button>').text('Listen for incoming transmissions');
  $body.prepend($msgBtn);

  const $newTwBtn = $('<button>').text('BROADCAST')
  $tweetBox.prepend($newTwBtn)

  let generateTweets = (currentUser) => {

    const tweetStream = currentUser ? streams.users[currentUser] : streams.home;

    // Map over streams.home to generate tweets
    tweetStream.map((tweet) => {
      const $tweet = $('<p></p>'); // Create a paragraph element for each tweet
      // Create a clickable username element
      const $userName = $('<a></a>')
      .text(`@${tweet.user}`) // Set the username text
      .addClass('username') // Add class
      .click(function(e) {
        $tweetContainer.html(''); // Clear previous tweets
        generateTweets(tweet.user)
      })

      //the tweet message
      const $twid = `${tweet.message}`;

      // Append all elements to the tweet (username, message, and timestamp)
      $tweet.append($userName) // Add the username
      .append(`: ${$twid} `) // Add the message
      .append($('<span></span>').text(moment(tweet.created_at).startOf('minute').fromNow())) // Add the timestamp
      .append($('<span></span>').text(moment(tweet.created_at).format('[,] MMMM Do YYYY, h:mm:ss a')));
      // Prepend the tweet to the container
      $tweetContainer.prepend($tweet);
    });
  };

  // Listen for button clicks to generate new tweets
  $msgBtn.click(function () {
    $tweetContainer.html(''); // Clear previous tweets
    generateTweets(); // Generate new tweets
  });

});

