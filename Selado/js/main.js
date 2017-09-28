$(function() {
  $('.hide-block:not(:first)').hide();
		$('.caption').click(function() {
			$('.hide-block').hide();
			$(this).siblings('.hide-block').show();
	})
})