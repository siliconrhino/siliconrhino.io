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
});
})(window.$);
