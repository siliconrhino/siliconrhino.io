(function ($) {
	$(document).ready(function() {
		$('#tweecool').tweecool({
			username : 'siliconrhino',
			limit : 1, // Number of tweets to show
			profile_image : false, // Show profile image
			show_time : false, // Show tweet time
			show_media : false,
			show_media_size: 'thumb'  //values: small, large, thumb, medium
		});
	
		$('.modalbutton').click(function() {
			$('.modal').modal('hide');
		});
		$("#menu").click(function(){
			$("body").toggleClass("shrink");
			$("#menu").toggleClass("is-active");
			$(".menu > .right").toggleClass("show");
			$(".header").toggleClass("blue");
			
		});
		window.onscroll = function() {barBackground()};

		function barBackground() {
				if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
					$(".header").addClass("white");
				}
				else {
					$(".header").removeClass("white");
				}
		}
	});
})(window.$);
