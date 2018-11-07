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
          <p class="mainContent">${data.content.text}</p>
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

$( document ).ready(function() {
  function loadTweet() {
    $.ajax({
      url:' /tweets',
      method: 'GET',
      dataType: 'json',
      success: renderTweets
    });
  }
  loadTweet();
});
