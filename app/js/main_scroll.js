jQuery(document).ready(function ($) {
    //variables
    var hijacking = $('body').data('hijacking'),
        animationType = $('body').data('animation'),
        delta = 0,
        scrollThreshold = 6,
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
        if (MQ == 'mobile') bindToggle = true;
        if (MQ == 'desktop') bindToggle = false;
    });

    function bindEvents(MQ, bool) {

        if (MQ == 'desktop' && bool) {
            //bind the animation to the window scroll event, arrows click and keyboard
            if (hijacking == 'on') {
                initHijacking();
                $(window).on('DOMMouseScroll mousewheel', scrollHijacking);
            } else {
                scrollAnimation();
                $(window).on('scroll', scrollAnimation);
            }
            prevArrow.on('click', prevSection);
            nextArrow.on('click', nextSection);
            
            
            $('.goto1').on('click', goToSection(0));
            $('.goto2').on('click', goToSection(1));
            $('.goto3').on('click', goToSection(2));
            $('.goto4').on('click', goToSection(3));
            $('.goto5').on('click', goToSection(4));
            $('.goto6').on('click', goToSection(5));

            $(document).on('keydown', function (event) {
                if (event.which == '40' && !nextArrow.hasClass('inactive')) {
                    event.preventDefault();
                    nextSection();
                } else if (event.which == '38' && (!prevArrow.hasClass('inactive') || (prevArrow.hasClass('inactive') && $(window).scrollTop() != sectionsAvailable.eq(0).offset().top))) {
                    event.preventDefault();
                    prevSection();
                }
            });
            //set navigation arrows visibility
            checkNavigation();
        } else if (MQ == 'mobile') {
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
            middleScroll = (hijacking == 'off' && $(window).scrollTop() != visibleSection.offset().top) ? true : false;
        visibleSection = middleScroll ? visibleSection.next('.cd-section') : visibleSection;

        var animationParams = selectAnimation(animationType, middleScroll, 'prev');
        unbindScroll(visibleSection.prev('.cd-section'), animationParams[3]);

        if (!animating && !visibleSection.is(":first-child")) {
            animating = true;
            visibleSection.removeClass('visible').children('div').velocity(animationParams[2], animationParams[3], animationParams[4])
                .end().prev('.cd-section').addClass('visible').children('div').velocity(animationParams[0], animationParams[3], animationParams[4], function () {
                    animating = false;
                    if (hijacking == 'off') $(window).on('scroll', scrollAnimation);
                });

            actual = actual - 1;
        }
        

        resetScroll();
    }

    function nextSection(event) {
        //go to next section
        typeof event !== 'undefined' && event.preventDefault();

        var visibleSection = sectionsAvailable.filter('.visible'),
            middleScroll = (hijacking == 'off' && $(window).scrollTop() != visibleSection.offset().top) ? true : false;

        var animationParams = selectAnimation(animationType, middleScroll, 'next');
        unbindScroll(visibleSection.next('.cd-section'), animationParams[3]);

        if (!animating && !visibleSection.is(":last-of-type")) {
            animating = true;
            visibleSection.removeClass('visible').children('div').velocity(animationParams[1], animationParams[3], animationParams[4])
                .end().next('.cd-section').addClass('visible').children('div').velocity(animationParams[0], animationParams[3], animationParams[4], function () {
                    animating = false;
                    if (hijacking == 'off') $(window).on('scroll', scrollAnimation);
                });

            actual = actual + 1;
        }
        resetScroll();
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
    
    
    function goToSection(goTo){
        
        var visibleSection = sectionsAvailable.filter('.visible'),
            currentId = $(this).attr('id'),
            currentSection = null;
            
            switch(currentId) {
                case 'section1':
                    currentSection = 0;
                    break;
                case 'section2':
                    currentSection = 1;
                    break;
                case 'section3':
                    currentSection = 2;
                    break;
                case 'section4':
                    currentSection = 3;
                    break;
                case 'section5':
                    currentSection = 4;
                    break;
                case 'section6':
                    currentSection = 5;
                    break;
            }
            steps = (goTo - currentSection);
        
            for (i = 0; i < Math.abs(steps); i++){
                if(steps > 0) {
                    nextSection();
                    
                }
                else {
                    prevSection();
                }
            }
        resetScroll();
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
                scale = (sectionOffset + 6 * windowHeight) * 0.2 / windowHeight;
                opacity = (sectionOffset + windowHeight) / windowHeight;
                break;
            }

        } else if (sectionOffset > 0 && sectionOffset <= windowHeight) {
            //section leaving the viewport - still has the '.visible' class
            translateY = (-sectionOffset) * 100 / windowHeight;

            switch (animationName) {
            case 'opacity':
                translateY = 0;
                scale = (sectionOffset + 6 * windowHeight) * 0.2 / windowHeight;
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

   