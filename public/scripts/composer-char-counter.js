const MAX_CHARACTERS_ALLOWED = 140;

$(document).ready(function() {
  $("textarea").on('keyup', function() {
    let inputCount = $(this).val().length;
    let charactersRemaining = (MAX_CHARACTERS_ALLOWED - inputCount);
    $('.counter').text(charactersRemaining);
    if (charactersRemaining <= 0) {
      $('.counter').css("color", "red");
    } else {
      $('.counter').css("color", "#244751");
    }
  });
});


