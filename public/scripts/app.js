/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = (data) => {
  return `
      <section class="tweet-container">
        <article class="tweet">
          <header>
            <img src="${data.user.avatars.small}"/>
            <div class="fullName">${data.user.name}</div>
            <div class="handle">${data.user.handle}</div>
          </header>
          <p class="mainContent">${escape(data.content.text)}</p>
          <footer class="timeStamp">${data.created_at}>
            <div class="icons">
              <ion-icon name="flag"></ion-icon>
              <ion-icon name="repeat"></ion-icon>
              <ion-icon name="heart"></ion-icon>
            </div>
          </footer>
        <article>
      </section>
         `;
}

function renderTweets(tweets) {
  for (tweet of tweets) {
    let $tweet = createTweetElement(tweet);
    $('.container').append($tweet);
  }
  return;
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

   $(document).ready( function () {
    $(".error").hide();
          $( "form" ).submit(function( event ) {
            event.preventDefault();
             if($(".counter").text() == 140) {
              $(".error").slideUp();
              $(".error span").empty();
              $(".error span").append("<span>Please enter a tweet.</span>");
              $(".error").slideDown();
            } else if ($(".counter").text() < 0) {
              $(".error").slideUp();
              $(".error span").empty();
              $(".error").slideDown();
              $(".error span").append("<span>Your tweet is too long.</span>");
            } else {
              $(".error").slideUp();
              $(".error span").empty();
                $.ajax({url:'/tweets', method: 'POST', data: $( this ).serialize()})
                .then(function (data){
                  location.reload();
                });
            }
          });
        });


$( document ).ready(function() {
  function loadTweet() {
    $.ajax({
      url:' /tweets',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        renderTweets(data);
      }
    });
  }
  loadTweet();
});
