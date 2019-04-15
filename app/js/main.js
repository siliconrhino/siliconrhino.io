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

		$('.quote_carousel').slick();

		$('.images-carousel').slick({
			dots: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			centerMode: true,
			variableWidth: true,
			autoplay: true,
			autoplaySpeed: 3000,
			cssEase: 'ease-in-out'
		});


		var url = window.location.pathname;
		$('a[href="'+url+'"]').parent('li').addClass('active');

		$('.modalbutton').click(function() {
			$('.modal').modal('hide');
		});
		$('#menu').click(function(){
			$('#menu').toggleClass('is-active');
			$('.menu > .right').toggleClass('show');
			$('.header').toggleClass('blue');
		});
		//if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
    //  $('.header').addClass('white');
    //}

		//window.onscroll = function() {barBackground();};

    window.waitlisted.start({domain: 'silicon-rhino-drinks-app.app.waitlisted.co'});

		function barBackground() {
				if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
					$('.header').addClass('white');
				}
				else {
					$('.header').removeClass('white');
				}
		}

// header space shuttle toggle animation

		$( '.space-shuttle-outline' ).click(function() {
			$( this ).toggleClass( 'headerShuttleMove' );
		  });


    });

  $(window).scroll(function() {
    var height = $(window).scrollTop();
    if(height > 1700) {
      $('#odometerOne')[0].innerHTML = 4556;
      $('#odometerTwo')[0].innerHTML = 2999;
      $('#odometerThree')[0].innerHTML = 3020;
    }
    if(height < 1700) {
      $('#odometerOne')[0].innerHTML = 0000;
      $('#odometerTwo')[0].innerHTML = 0000;
      $('#odometerThree')[0].innerHTML = 0000;
    }
  });

  $(window).scroll(function() {
    console.log( $(this).scrollTop() );
  });
})(window.$);

