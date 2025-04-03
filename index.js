
$(document).ready(() => {
  const $body = $('body');
  $body.html('');


  const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<p></p>');
    // username needs it's own tag
    const twid = `${tweet.message}`
    const user = `@${tweet.user}`;
    //  needs to change to clickable element
    $tweet.text(`${user} screams out into the endless void... ${twid}`);

    return $tweet;
  });
    // create a function that creates new tweets
  // Create a button 'Listen for new transmissions'
  const $msgBtn = document.createElement('button');
  $body.append($msgBtn)
  $msgBtn.innerText = "Listen for new transmission"
  $("button").click(function(){
    
  })

  $body.append($tweets);

});
