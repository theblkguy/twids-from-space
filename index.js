
$(document).ready(() => {
  const $body = $('body');
  const $div = $('<div>') // creates tag
  
  $body.html(''); // clears body
  $body.prepend($div)

  const $msgBtn = $('<button>').text('Listen for incoming transmissions')

  $body.prepend($msgBtn)

  let generateTweets = ()=> {
    let $tweets = streams.home.map((tweet) => {
      const twid = `${tweet.message}`
      
      //  needs to change to clickable element
      // username needs it's own tag
      const $user = $('<a></a>')
      .text(`@${tweet.user}`)
      .attr('href', '#')
      .addClass('username')
      
      const $tweet = $('<p></p>');

      $div.prepend($tweet.text(`${user} ${twid} ${moment(tweet.created_at).format('MMMM Do YYYY, h:mm:ss a')}`))
    });
  }

  // create a function that creates new tweets
  $msgBtn.click(function(){
    $div.html('')
    generateTweets()
  })

});

