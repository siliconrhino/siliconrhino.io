function scroll_Function(){var a=document.getElementById("team-carousel"),b=document.getElementById("about");/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?document.body.scrollTop>1040||document.documentElement.scrollTop>1040?(a.classList.add("minimize"),b.classList.add("minimize")):(a.classList.remove("minimize"),b.classList.remove("minimize")):document.body.scrollTop>480||document.documentElement.scrollTop>480?(a.classList.add("minimize"),b.classList.add("minimize")):(a.classList.remove("minimize"),b.classList.remove("minimize"))}function showbtn(){window.scrollY>300?btn.classList.add("show"):btn.classList.remove("show")}function clickNext(){carouselScroll.scrollBy(280,0)}function clickPrevious(){carouselScroll.scrollBy(-280,0)}function findPos(a){var b=0;if(a.offsetParent){do b+=a.offsetTop;while(a=a.offsetParent);return b}}!function(a){a.fn.extend({tweecool:function(b){function c(a){var b=new Date,c=Date.parse(b),d=Date.parse(a),e=(c-d)/1e3,f=1,g=60,h=3600,i=86400,j=604800,k=2592e3,l=31536e3;return e>f&&g>e?Math.round(e/f)+" seconds ago":e>=g&&h>e?Math.round(e/g)+" minutes ago":e>=h&&i>e?Math.round(e/h)+" hours ago":e>=i&&j>e?Math.round(e/i)+" days ago":e>=j&&k>e?Math.round(e/j)+" weeks ago":e>=k&&l>e?Math.round(e/k)+" months ago":"over a year ago"}var d={username:"tweecool",limit:5,profile_image:!0,show_time:!0,show_media:!1,show_media_size:"thumb"};return b=a.extend(d,b),this.each(function(){var d=b,e=a(this),f=a("<ul>").appendTo(e),g=/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,h="";a.getJSON("http://api.tweecool.com/?screenname="+d.username+"&count="+d.limit,function(b){if(b.errors||null==b)return e.html("No tweets available."),!1;var i="";d.profile_image&&(i='<a href="https://twitter.com/'+d.username+'" target="_blank"><img src="'+b.user.profile_image_url+'" alt="'+d.username+'" /></a>'),a.each(b.tweets,function(a,b){var e="";e=d.show_time?c(b.created_at):"",d.show_media&&b.media_url&&(h='<a href="https://twitter.com/'+d.username+'" target="_blank"><img src="'+b.media_url+":"+d.show_media_size+'" alt="'+d.username+'" class="media" /></a>'),f.append("<li>"+i+'<div class="tweets_txt">'+b.text.replace(g,'<a href="$1" target="_blank">$1</a>')+h+" <span>"+e+"</span></div></li>")})}).fail(function(a,b,c){e.html("No tweets available")})})}})}(window.jQuery),function(a){a(document).ready(function(){a("#tweecool").tweecool({username:"siliconrhino",limit:1,profile_image:!1,show_time:!1,show_media:!1,show_media_size:"thumb"}),a(".quote_carousel").slick(),a(".images-carousel").slick({dots:!1,infinite:!0,speed:300,slidesToShow:1,centerMode:!0,variableWidth:!0,autoplay:!0,autoplaySpeed:3e3,cssEase:"ease-in-out"});var b=window.location.pathname;a('a[href="'+b+'"]').parent("li").addClass("active"),a(".modalbutton").click(function(){a(".modal").modal("hide")}),a("#menu").click(function(){a("#menu").toggleClass("is-active"),a("#logo").toggleClass("is-active"),a(".menu > .right").toggleClass("show"),a(".header").toggleClass("blue")}),window.waitlisted.start({domain:"silicon-rhino-drinks-app.app.waitlisted.co"}),a(".space-shuttle-outline").click(function(){a(this).toggleClass("headerShuttleMove")})})}(window.$),$(".drawer-toggle").click(function(a){$(".drawer").toggleClass("active"),a.preventDefault()}),document.onkeydown=function(a){a=a||window.event,27===a.keyCode&&$(".drawer").toggleClass("active")},$("#menu-toggle").click(function(a){$(this).toggleClass("open"),$(".drawer").toggleClass("active"),$("#space-shuttle").toggleClass("hide"),a.preventDefault()}),window.addEventListener("scroll",scroll_Function),jQuery(document).ready(function(a){function b(a){a=a||window.event,"38"==a.keyCode?f(a):"40"==a.keyCode&&g(a)}function c(a){var b=a[0].dataset.section,c=document.getElementsByClassName("scrollIconClass");"6"!==b?c[0].classList.add("scrollIcon"):c[0].classList.remove("scrollIcon")}function d(b,c){function d(a){var b=(new Date).getTime();if(i>b-h){if(l>b-h)return;if(Math.abs(a.originalEvent.wheelDelta)<m)return}return h=(new Date).getTime(),e(a)}var h,i=1200,l=600,m=150;"desktop"===b&&c?("on"===p&&a(window).on("DOMMouseScroll mousewheel",d),v.on("click",f),w.on("click",g),a(document).on("keydown",function(b){"40"!==b.which||w.hasClass("inactive")?"38"===b.which&&(!v.hasClass("inactive")||v.hasClass("inactive")&&a(window).scrollTop()!==t.eq(0).offset().top)&&(b.preventDefault(),f()):(b.preventDefault(),g())}),j()):"mobile"===b&&(k(),a(window).off("DOMMouseScroll mousewheel",d),v.off("click",f),w.off("click",g),a(document).off("keydown"))}function e(a){return a.originalEvent.detail<0||a.originalEvent.wheelDelta>0?(q--,Math.abs(q)>=r&&f()):(q++,q>=r&&g()),!1}function f(b){"undefined"!=typeof b&&b.preventDefault();var d=t.filter(".visible"),e="off"===p&&a(window).scrollTop()!==d.offset().top?!0:!1;if(d=e?d.next(".cd-section"):d,i(),!d.is(":first-of-type")){var f=d.prev(".cd-section"),g=f[0].dataset.section,h=a(".cd-vertical-nav a[data-goto='"+g+"']")[0];n(h),o(f),s-=1,c(f),m(d,f,!1)}}function g(b){"undefined"!=typeof b&&b.preventDefault();var d=t.filter(".visible");"off"===p&&a(window).scrollTop()!==d.offset().top?!0:!1;if(i(),!d.is(":last-of-type")){var e=d.next(".cd-section"),f=e[0].dataset.section,g=a(".cd-vertical-nav a[data-goto='"+f+"']")[0];n(g),o(e),s+=1,c(e),m(d,e,!0)}}function h(b){"undefined"!=typeof b&&b.preventDefault();var d=t.filter(".visible"),e=(d.attr("id"),d[0].dataset.section,b.target.dataset["goto"]),d=t.filter(".visible"),f=("off"==p&&a(window).scrollTop()!=d.offset().top?!0:!1,a(".cd-section[data-section='"+e+"']"));i(),c(f),o(f),m(d,f,!0)}function i(){q=0,j()}function j(){t.filter(".visible").is(":first-of-type")?v.addClass("inactive"):v.removeClass("inactive"),t.filter(".visible").is(":last-of-type")?w.addClass("inactive"):w.removeClass("inactive")}function k(){t.children("div").each(function(){a(this).attr("style","")})}function l(){return window.getComputedStyle(document.querySelector("body"),"::before").getPropertyValue("content").replace(/"/g,"").replace(/'/g,"")}function m(a,b,c){var d=b.prev(".cd-section"),e=b.next(".cd-section");setTimeout(function(){a.removeClass("visible"),a[0]===d[0]||a[0]===e[0]?(d.removeClass("up").addClass("down"),e.removeClass("down").addClass("up")):(d.removeClass("up").addClass("down"),e.removeClass("down").addClass("up"),a.removeClass("up").addClass("down")),b.addClass("visible")},0)}function n(a){null!==z&&(z.className="cd-dot"),a.className+=" highlite",z=a}function o(b){A===b[0]?a(".space-shuttle-pic",b).addClass("rhino"):a(".space-shuttle-pic").removeClass("rhino")}var p=a("body").data("hijacking"),q=0,r=1,s=1,t=a(".cd-section"),u=(a("#cd-vertical-nav a"),a(".cd-vertical-nav")),v=u.find("a.cd-prev"),w=u.find("a.cd-next"),x=l(),y=!1;d(x,!0),a(window).on("resize",function(){x=l(),d(x,y),"mobile"===x&&(y=!0),"desktop"===x&&(y=!1)}),a(".goto").on("click",h),document.onkeydown=b;var z=document.getElementById("default");window.highlite=n;var A=document.getElementById("section5")}),jQuery(document).ready(function(a){function b(){d.each(function(){$this=a(this);var b=a('#cd-vertical-nav a[href="#'+$this.attr("id")+'"]').data("number")-1;$this.offset().top-a(window).height()/2<a(window).scrollTop()&&$this.offset().top+$this.height()-a(window).height()/2>a(window).scrollTop()?e.eq(b).addClass("is-selected"):e.eq(b).removeClass("is-selected")})}function c(b){a("body,html").animate({scrollTop:b.offset().top},600)}var d=a(".cd-section"),e=a("#cd-vertical-nav a");b(),a(window).on("scroll",function(){b()}),e.on("click",function(b){b.preventDefault(),c(a(this.hash))}),a(".cd-scroll-down").on("click",function(b){b.preventDefault(),c(a(this.hash))}),a(".touch .cd-nav-trigger").on("click",function(){a(".touch #cd-vertical-nav").toggleClass("open")}),a(".touch #cd-vertical-nav a").on("click",function(){a(".touch #cd-vertical-nav").removeClass("open")})}),document.addEventListener("DOMContentLoaded",function(){"/what-we-do/"===window.location.pathname&&(setInterval(function(){var a=document.getElementById("websiteSvg"),b=a.innerHTML;a.innerHTML=b},36e3),setInterval(function(){var a=document.getElementById("appSvg"),b=a.innerHTML;a.innerHTML=b},9e3),setInterval(function(){var a=document.getElementById("mvpSvg"),b=a.innerHTML;a.innerHTML=b},12e3))});var btn=document.getElementById("toTopButton");btn&&(btn.onclick=function(){window.scroll({top:0,left:0,behavior:"smooth"})}),window.addEventListener("scroll",showbtn);var next=document.getElementById("next"),previous=document.getElementById("previous"),carouselScroll=document.getElementById("carousel");next&&next.addEventListener("click",clickNext),previous&&previous.addEventListener("click",clickPrevious);var carousel_wrap=document.getElementById("team-carousel");carousel_wrap.addEventListener("click",function(a){const b=a.target;var c=carousel_wrap.classList.contains("minimize"),d=document.querySelector("#"+b.dataset.name);const e=d.getBoundingClientRect().top+window.pageYOffset;var f;f="scrollBehavior"in document.documentElement.style?!0:!1,a.preventDefault(),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&c?window.scrollTo({top:e-250,behavior:"smooth"}):/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)?window.scrollTo({top:e-300,behavior:"smooth"}):c?window.scrollTo({top:e-280,behavior:"smooth"}):window.scrollTo({top:e-600,behavior:"smooth"})});