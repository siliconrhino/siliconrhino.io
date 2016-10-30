jQuery(document).ready(function ($) {
  // variables
  var hijacking = $('body').data('hijacking'),
    delta = 0,
    scrollThreshold = 1,
    actual = 1,
    animating = false;


  // DOM elements
  var sectionsAvailable = $('.cd-section'),
    navigationItems = $('#cd-vertical-nav a'),
    verticalNav = $('.cd-vertical-nav'),
    prevArrow = verticalNav.find('a.cd-prev'),
    nextArrow = verticalNav.find('a.cd-next');


  // check the media query and bind corresponding events
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

  if (hijacking === 'on') {
    removeScrollIcon();
  }

  function bindEvents(MQ, bool) {
    if (MQ === 'desktop' && bool) {
      //bind the animation to the window scroll event, arrows click and keyboard
      if (hijacking === 'on') {
        var lastSuccessfulScrollTime,
          scrollMaxThrottle = 1000,
          scrollMinThrottle = 50,
          wheelDeltaThreshold = 100;

        $(window).on('DOMMouseScroll mousewheel', function (event) {
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
      prevArrow.off('click', prevSection);
      nextArrow.off('click', nextSection);
      $(document).off('keydown');
    }
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

    resetScroll();

    if (!animating && !visibleSection.is(':first-of-type')) {
      animating = true;

      var goto =
        visibleSection.prev('.cd-section')[0].dataset.section;
      var current = $(".cd-vertical-nav a[data-goto='" + goto + "']")[0];

      highlite(current);
      removeScrollIcon();
      var newCurrentSection = sectionsAvailable.filter('.visible');
      shuttleAnimation(newCurrentSection);

      actual = actual - 1;

      transitionBetweenSections(visibleSection, visibleSection.prev('.cd-section'), false);
    }
  }

  function nextSection(event) {
    //go to next section
    typeof event !== 'undefined' && event.preventDefault();

    var visibleSection = sectionsAvailable.filter('.visible'),
      middleScroll = (hijacking === 'off' && $(window).scrollTop() !== visibleSection.offset().top) ? true : false;

    resetScroll();

    if (!animating && !visibleSection.is(":last-of-type")) {
      animating = true;

      var goto =
        visibleSection.next('.cd-section')[0].dataset.section;
      var current = $(".cd-vertical-nav a[data-goto='" + goto + "']")[0];

      highlite(current);
      removeScrollIcon();
      var newCurrentSection = sectionsAvailable.filter('.visible');
      shuttleAnimation(newCurrentSection);


      actual = actual + 1;

      transitionBetweenSections(visibleSection, visibleSection.next('.cd-section'), true);
    }

  }

  function goToSection(event) {
    typeof event !== 'undefined' && event.preventDefault();

    var visibleSection = sectionsAvailable.filter('.visible'),
      currentId = visibleSection.attr('id'),
      currentSection = visibleSection[0].dataset.section,
      goTo = event.target.dataset.goto;

    removeScrollIcon();
    var newCurrentSection = sectionsAvailable.filter('.visible');
    shuttleAnimation(newCurrentSection);


    var visibleSection = sectionsAvailable.filter('.visible'),
      middleScroll = (hijacking == 'off' && $(window).scrollTop() != visibleSection.offset().top) ? true : false;
    var goToSection = $(".cd-section[data-section='" + goTo + "']");

    resetScroll();

    if (!animating) {
      animating = true;
      transitionBetweenSections(visibleSection, goToSection, true);
    }
  }

  function resetScroll() {
    delta = 0;
    checkNavigation();
  }

  function checkNavigation() {
    // update navigation arrows visibility
    (sectionsAvailable.filter('.visible').is(':first-of-type')) ? prevArrow.addClass('inactive') : prevArrow.removeClass('inactive');
    (sectionsAvailable.filter('.visible').is(':last-of-type')) ? nextArrow.addClass('inactive') : nextArrow.removeClass('inactive');
  }

  function resetSectionStyle() {
    // on mobile - remove style applied with jQuery
    sectionsAvailable.children('div').each(function () {
      $(this).attr('style', '');
    });
  }

  function deviceType() {
    // detect if desktop/mobile
    return window.getComputedStyle(document.querySelector('body'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
  }

  function transitionBetweenSections(oldCurrent, newCurrent, translateUp) {
    var newPrevious = newCurrent.prev('.cd-section');
    var newNext = newCurrent.next('.cd-section');

    setTimeout(function () {
      oldCurrent.removeClass('visible');

      if (oldCurrent[0] === newPrevious[0] || oldCurrent[0] === newNext[0]) {
        newPrevious.removeClass('up').addClass('down');
        newNext.removeClass('down').addClass('up');
      } else {
        newPrevious.removeClass('up').addClass('down');
        newNext.removeClass('down').addClass('up');
        oldCurrent.removeClass('up').addClass('down');
      }

      newCurrent.addClass('visible');
    }, 0);

    setTimeout(function () {
      animating = false;
    }, 700);
  }

  // vertical menu

  var current = document.getElementById('default');

  function highlite(verticalLink) {
    if (current !== null) {
      current.className = "cd-dot";
    }
    verticalLink.className += " highlite";
    current = verticalLink;

  }

  // shuttle animation

  function shuttleAnimation(current) {

  }
});
