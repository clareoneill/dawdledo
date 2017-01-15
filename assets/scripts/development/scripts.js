$(function () {
  $('.board').click(function() {
    $(this).toggleClass('selected');
    $(this).find('.material-icons').toggleClass('hidden');
  });

  $('.show-more-boards').click(function() {
    $('.more-boards').toggleClass('hidden');
    $(this).addClass('hidden');
  });

  $('[name="frequency"]').change(function () {
    if($('#weekly').is(':checked')) {
      $('.weekly-options').removeClass('hidden');
    } else {
      $('.weekly-options').addClass('hidden');
    }

    if($('#monthly').is(':checked')) {
      $('.monthly-options').removeClass('hidden');
    } else {
      $('.monthly-options').addClass('hidden');
    }
  });

  $('.weekly-options .close').click(function() {
    $('.weekly-options').addClass('hidden');
  });

  $('.monthly-options .close').click(function() {
    $('.monthly-options').addClass('hidden');
  });
});
