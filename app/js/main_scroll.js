jQuery(document).ready(function ($) {
    //variables
    var hijacking = $('body').data('hijacking'),
        animationType = $('body').data('animation'),
        delta = 0,
        scrollThreshold = 1,
        actual = 1,
        animating = false;


    //DOM elements
    var sectionsAvailable = $('.cd-section'),
        navigationItems = $('#cd-vertical-nav a'),
        verticalNav = $('.cd-vertical-nav'),
        prevArrow = verticalNav.find('a.cd-prev'),
        nextArrow = verticalNav.find('a.cd-next');


    //check the media query and bind corresponding events
    var MQ = deviceType(),
        bindToggle = false;

    bindEvents(MQ, true);

    $(window).on('resize', function () {
        MQ = deviceType();
        bindEvents(MQ, bindToggle);
        if (MQ === 'mobile') bindToggle = true;
        if (MQ === 'desktop') bindToggle = false;
    });

    $('.goto').on('click', goToSection);

    $(".btn1").click(function(){
        $("p.lead").fadeOut()
    });

    document.onkeydown = checkKey;

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == '38') {
           prevSection(e);
        }
        else if (e.keyCode == '40') {
            // down arrow
            nextSection(e);
        }
    }



    function removeScrollIcon() {
      var currentSection = sectionsAvailable.filter('.visible');
      var visibleSection = currentSection[0].dataset.section;
      var scrollIconClass = document.getElementsByClassName('scrollIconClass');

      if (visibleSection !== '6') {
        scrollIconClass[0].classList.add('scrollIcon');
      } else {
        scrollIconClass[0].classList.remove('scrollIcon');
      }
    }

   removeScrollIcon();


    function bindEvents(MQ, bool) {
        if (MQ === 'desktop' && bool) {
            //bind the animation to the window scroll event, arrows click and keyboard
            if (hijacking === 'on') {
                initHijacking();
                var lastSuccessfulScrollTime,
                  scrollMaxThrottle = 1000,
                  scrollMinThrottle = 50,
                  wheelDeltaThreshold = 100;

                $(window).on('DOMMouseScroll mousewheel', function(event) {
                  var now = new Date().getTime();

                  // if scrolled more than once within a time period
                  if (now - lastSuccessfulScrollTime < scrollMaxThrottle) {
                    // don't process scroll more than once within a time period
                    if (now - lastSuccessfulScrollTime < scrollMinThrottle) {
                      return;
                    }

                    // don't fire again within the throttle time unless
                    // the scroll delta reaches a certain peak
                    if (Math.abs(event.originalEvent.wheelDelta) < wheelDeltaThreshold) {
                      return;
                    }
                  }

                  lastSuccessfulScrollTime = new Date().getTime();

                  return scrollHijacking(event);
                });
            } else {
                scrollAnimation();
                $(window).on('scroll', scrollAnimation);
            }
            prevArrow.on('click', prevSection);
            nextArrow.on('click', nextSection);


            $(document).on('keydown', function (event) {
                if (event.which === '40' && !nextArrow.hasClass('inactive')) {
                    event.preventDefault();
                    nextSection();
                } else if (event.which === '38' && (!prevArrow.hasClass('inactive') || (prevArrow.hasClass('inactive') && $(window).scrollTop() !== sectionsAvailable.eq(0).offset().top))) {
                    event.preventDefault();
                    prevSection();
                }
            });
            //set navigation arrows visibility
            checkNavigation();
        } else if (MQ === 'mobile') {
            //reset and unbind
            resetSectionStyle();
            $(window).off('DOMMouseScroll mousewheel', scrollHijacking);
            $(window).off('scroll', scrollAnimation);
            prevArrow.off('click', prevSection);
            nextArrow.off('click', nextSection);
            $(document).off('keydown');
        }
    }

    function scrollAnimation() {
        //normal scroll - use requestAnimationFrame (if defined) to optimize performance
        (!window.requestAnimationFrame) ? animateSection(): window.requestAnimationFrame(animateSection);
    }

    function animateSection() {
        var scrollTop = $(window).scrollTop(),
            windowHeight = $(window).height(),
            windowWidth = $(window).width();

        sectionsAvailable.each(function () {
            var actualBlock = $(this),
                offset = scrollTop - actualBlock.offset().top;

            //according to animation type and window scroll, define animation parameters
            var animationValues = setSectionAnimation(offset, windowHeight, animationType);

            transformSection(actualBlock.children('div'),  animationValues[0],animationValues[1], animationValues[2], animationValues[3], animationValues[4], animationValues[5]);
            (offset >= 0 && offset < windowHeight) ? actualBlock.addClass('visible'): actualBlock.removeClass('visible');
        });

        checkNavigation();
    }

    function transformSection(element, translateY, scaleValue, rotateXValue, opacityValue, boxShadow) {
        //transform sections - normal scroll
        element.velocity({
            translateY: translateY + 'vh',
            scale: scaleValue,
            rotateX: rotateXValue,
            opacity: opacityValue,
            boxShadowBlur: boxShadow + 'px',
            translateZ: 0,
        }, 0);
    }

    function initHijacking() {
        // initialize section style - scrollhijacking
        var visibleSection = sectionsAvailable.filter('.visible'),
            topSection = visibleSection.prevAll('.cd-section'),
            bottomSection = visibleSection.nextAll('.cd-section'),
            animationParams = selectAnimation(animationType, false),
            animationVisible = animationParams[0],
            animationTop = animationParams[1],
            animationBottom = animationParams[2];

        visibleSection.children('div').velocity(animationVisible, 1, function () {
            visibleSection.css('opacity', 1);
            topSection.css('opacity', 1);
            bottomSection.css('opacity', 1);
        });
        topSection.children('div').velocity(animationTop, 0);
        bottomSection.children('div').velocity(animationBottom, 0);
    }

    function scrollHijacking(event) {
        // on mouse scroll - check if animate section
        if (event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0) {
            delta--;
            (Math.abs(delta) >= scrollThreshold) && prevSection();
        } else {
            delta++;
            (delta >= scrollThreshold) && nextSection();
        }
        return false;
    }

    function prevSection(event) {
        //go to previous section
        typeof event !== 'undefined' && event.preventDefault();

        var visibleSection = sectionsAvailable.filter('.visible'),
            middleScroll = (hijacking === 'off' && $(window).scrollTop() !== visibleSection.offset().top) ? true : false;
        visibleSection = middleScroll ? visibleSection.next('.cd-section') : visibleSection;

        var animationParams = selectAnimation(animationType, middleScroll, 'prev');
        unbindScroll(visibleSection.prev('.cd-section'), animationParams[3]);

        if (!animating && !visibleSection.is(':first-of-type')) {
            animating = true;

            transitionBetweenSections(visibleSection, visibleSection.prev('.cd-section'), false, animationParams);

            var goto =
                visibleSection.prev('.cd-section')[0].dataset.section;
            var current = $(".cd-vertical-nav a[data-goto='" + goto + "']")[0];

            highlite(current);
            removeScrollIcon();
           var newCurrentSection = sectionsAvailable.filter('.visible');
            shuttleAnimation(newCurrentSection);


            actual = actual - 1;
        }


        resetScroll();
    }

    function nextSection(event) {
        //go to next section
        typeof event !== 'undefined' && event.preventDefault();

        var visibleSection = sectionsAvailable.filter('.visible'),
            middleScroll = (hijacking === 'off' && $(window).scrollTop() !== visibleSection.offset().top) ? true : false;

        var animationParams = selectAnimation(animationType, middleScroll, 'next');
        unbindScroll(visibleSection.next('.cd-section'), animationParams[3]);

        if (!animating && !visibleSection.is(":last-of-type")) {
            animating = true;

            transitionBetweenSections(visibleSection, visibleSection.next('.cd-section'), true, animationParams);

            var goto =
                visibleSection.next('.cd-section')[0].dataset.section;
            var current = $(".cd-vertical-nav a[data-goto='" + goto + "']")[0];

            highlite(current);
            removeScrollIcon();
          var newCurrentSection = sectionsAvailable.filter('.visible');
            shuttleAnimation(newCurrentSection);


            actual = actual + 1;
        }
        resetScroll();

    }

    function scrollToSection(event, goTo) {
        //go to next section
        typeof event !== 'undefined' && event.preventDefault();

        var visibleSection = sectionsAvailable.filter('.visible'),
            middleScroll = (hijacking == 'off' && $(window).scrollTop() != visibleSection.offset().top) ? true : false;
        var goToSection = $(".cd-section[data-section='" + goTo + "']");

        var animationParams = selectAnimation(animationType, middleScroll, 'next');
        unbindScroll(goToSection, animationParams[3]);

        if (!animating) {
            animating = true;
            transitionBetweenSections(visibleSection, goToSection, true, animationParams);
        }
        resetScroll();
    }

    function goToSection(event){

        typeof event !== 'undefined' && event.preventDefault();

        var visibleSection = sectionsAvailable.filter('.visible'),
            currentId = visibleSection.attr('id'),
            currentSection = visibleSection[0].dataset.section,
            goTo = event.target.dataset.goto;

            scrollToSection(event, goTo);
            removeScrollIcon();
       var newCurrentSection = sectionsAvailable.filter('.visible');
            shuttleAnimation(newCurrentSection);


    }


    function unbindScroll(section, time) {
        //if clicking on navigation - unbind scroll and animate using custom velocity animation
        if (hijacking == 'off') {
            $(window).off('scroll', scrollAnimation);
            (animationType == 'catch') ? $('body, html').scrollTop(section.offset().top): section.velocity("scroll", {
                duration: time
            });
        }
    }


    function resetScroll() {
        delta = 0;
        checkNavigation();
    }

    function checkNavigation() {
        //update navigation arrows visibility
        (sectionsAvailable.filter('.visible').is(':first-of-type')) ? prevArrow.addClass('inactive'): prevArrow.removeClass('inactive');
        (sectionsAvailable.filter('.visible').is(':last-of-type')) ? nextArrow.addClass('inactive'): nextArrow.removeClass('inactive');
    }

    function resetSectionStyle() {
        //on mobile - remove style applied with jQuery
        sectionsAvailable.children('div').each(function () {
            $(this).attr('style', '');
        });
    }

    function deviceType() {
        //detect if desktop/mobile
        return window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
    }

    function selectAnimation(animationName, middleScroll, direction) {
        // select section animation - scrollhijacking
        var animationVisible = 'translateNone',
            animationTop = 'translateUp',
            animationBottom = 'translateDown',
            easing = 'ease',
            animDuration = 800;

        switch (animationName) {
        case 'opacity':
            animDuration = 700;
            animationTop = 'hide.scaleUp';
            animationBottom = 'hide.scaleDown';
            break;
        case 'parallax':
            animationTop = 'translateUp.half';
            easing = 'easeInCubic';
            break;
        }

        return [animationVisible, animationTop, animationBottom, animDuration, easing];
    }

    function transitionBetweenSections(previous, next, translateUp, animationParams) {
      previous
        .removeClass('visible')
        .children('div')
          .velocity(translateUp ? animationParams[1] : animationParams[2], animationParams[3], animationParams[4]);

      next
        .addClass('visible')
        .children('div')
          .velocity(animationParams[0], animationParams[3], animationParams[4], function () {
            animating = false;
            if (hijacking == 'off') $(window).on('scroll', scrollAnimation);
          });
    }

    function setSectionAnimation(sectionOffset, windowHeight, animationName) {
        // select section animation - normal scroll
        var scale = 1,
            translateY = 100,
            rotateX = '0deg',
            opacity = 1,
            boxShadowBlur = 0;

        if (sectionOffset >= -windowHeight && sectionOffset <= 0) {
            // section entering the viewport
            translateY = (-sectionOffset) * 100 / windowHeight;

            switch (animationName) {
            case 'opacity':
                translateY = 0;
                scale = (sectionOffset + 7 * windowHeight) * 0.2 / windowHeight;
                opacity = (sectionOffset + windowHeight) / windowHeight;
                break;
            }

        } else if (sectionOffset > 0 && sectionOffset <= windowHeight) {
            //section leaving the viewport - still has the '.visible' class
            translateY = (-sectionOffset) * 100 / windowHeight;

            switch (animationName) {
            case 'opacity':
                translateY = 0;
                scale = (sectionOffset + 7 * windowHeight) * 0.2 / windowHeight;
                opacity = (windowHeight - sectionOffset) / windowHeight;
                break;
            case 'parallax':
                translateY = (-sectionOffset) * 50 / windowHeight;
                break;

            }

        } else if (sectionOffset < -windowHeight) {
            //section not yet visible
            translateY = 100;

            switch (animationName) {
            case 'opacity':
                translateY = 0;
                scale = 0.8;
                opacity = 0;
                break;
            }

        } else {
            //section not visible anymore
            translateY = -100;

            switch (animationName) {
            case 'opacity':
                translateY = 0;
                scale = 1.2;
                opacity = 0;
                break;
            case 'parallax':
                translateY = -50;
                break;
            }
        }

        return [translateY, scale, rotateX, opacity, boxShadowBlur];
    }


});

/* Custom effects registration - feature available in the Velocity UI pack */
//none
$.Velocity
    .RegisterEffect("translateUp", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: '-100%'
            }, 1]
        ]
    });
$.Velocity
    .RegisterEffect("translateDown", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: '100%'
            }, 1]
        ]
    });
$.Velocity
    .RegisterEffect("translateNone", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: '0',
                opacity: '1',
                scale: '1',
                rotateX: '0',
                boxShadowBlur: '0'
            }, 1]
        ]
    });


//opacity
$.Velocity
    .RegisterEffect("hide.scaleUp", {
        defaultDuration: 1,
        calls: [
            [{
                opacity: '0',
                scale: '1.2'
            }, 1]
        ]
    });
$.Velocity
    .RegisterEffect("hide.scaleDown", {
        defaultDuration: 1,
        calls: [
            [{
                opacity: '0',
                scale: '0.8'
            }, 1]
        ]
    });
//parallax
$.Velocity
    .RegisterEffect("translateUp.half", {
        defaultDuration: 1,
        calls: [
            [{
                translateY: '-50%'
            }, 1]
        ]
    });


// Vertical menu


   var current = document.getElementById('default');

        function highlite(verticalLink)
      {
         if (current !== null)
         {
             current.className = "cd-dot";
         }
         verticalLink.className += " highlite";
        current = verticalLink;

      }

// shuttle animation

 // var sectionToAnimateOn = document.getElementById('section5');

      // function shuttleAnimation(current)
      // {
         // if (sectionToAnimateOn === current[0])
         //{
             // current[0].className = "space-shuttle-pic rhino";
        // }

      //}






