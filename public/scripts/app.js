/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Takes tweet from database and converts it to html to show on the page
const createTweetElement = (data) => {
  return `
        <article class="tweet">
          <header>
            <img src="${data.user.avatars.small}"/>
            <div class="fullName">${data.user.name}</div>
            <div class="handle">${data.user.handle}</div>
          </header>
          <p class="mainContent">${escape(data.content.text)}</p>
          <footer>
          <span class="timeStamp">${$.timeago(data.created_at)} </span>
            <div class="icons">
              <ion-icon name="flag"></ion-icon>
              <ion-icon name="repeat"></ion-icon>
              <ion-icon name="heart"></ion-icon>
            </div>
          </footer>
        <article>
         `;
}


//Function which prevents users from cross-site scripting
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//Function which loops the tweets and adds the converted tweet into tweet-container in HTML
function renderTweets(tweets) {
  for (tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('.tweet-container').prepend($tweet);
  }
}

//Function which loads all the tweets is called from within document ready
function loadTweets() {
    $.ajax({
      url:' /tweets',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        renderTweets(data);
      }
    });
  }

$(document).ready( function () {

  loadTweets();



//Function which addresses the textbox input in compose tweet and displays relevant error
//If no error the tweet shall pass into the database and onto the screen
  let error = $(".error");

  error.hide();
  $( "form" ).submit(function( event ) {
    event.preventDefault();
    if($(".counter").text() == 140) {
      error.slideUp();
      $(".error span").empty().append("<span>Please enter a tweet.</span>");
      error.slideDown();
    } else if ($(".counter").text() < 0) {
      error.slideUp();
      $(".error span").empty();
      error.slideDown();
      $(".error span").append("<span>Your tweet is too long.</span>");
    } else {
      error.slideUp();
      $(".error span").empty();
        $.ajax({url:'/tweets', method: 'POST', data: $( this ).serialize()})
         .then(function (data){
            $(".tweet-container").empty();
            loadTweets();
        });
    }
  });

//For the compose button in nav-bar when clicked the text area will focus after compose box slides.
  $( ".composeSlide" ).click(function() {
    $( ".new-tweet" ).slideToggle();
    $("textarea").focus();
  });


});
