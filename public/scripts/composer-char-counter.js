$(document).ready(function() {
  // --- our code goes here ---
  
  $('.new-tweet form textarea').on('input', function() {
    //// Get the current length of the textarea content
    const textLength = $(this).val().length;
   
    // Calculate the remaining characters
    const remainingChars = 140 - textLength;
    
    // Update the counter
    $('.counter').text(remainingChars);
    let $form = $(this).closest('form');
    let $counter = $form.find('.counter');
    // Optionally, change the color of the counter if characters exceed the limit
    if (remainingChars < 0) {
      $counter.addClass('counter-red');
  } else {
      $counter.removeClass('counter-red');
  }
});
});