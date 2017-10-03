$(document).ready(function() {
	//<a class="fancybox"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();

	$(".top_mnu").navigation();
	
	$("#callback").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("#callback").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

});