requirejs.config({
    baseUrl: '',
    paths: {
        'jquery': ['//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min'],
        'jquery-easing': ['//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min'],
        'bootstrap': ['//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min'],
        'waypoints': ['//cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.4/waypoints.min'],
        'waypoints-sticky': ['//cdnjs.cloudflare.com/ajax/libs/waypoints/2.0.4/waypoints-sticky.min']
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'waypoints-sticky': {
            deps: ['jquery', 'waypoints']
        },
        'jquery-easing': {
            deps: ['jquery']
        }
    }
});

require(['jquery', 'bootstrap', 'waypoints-sticky', 'jquery-easing'], function($) {
    $(function() {
        var $nav = $('[data-js="affix-nav"]');
        var $intro = $('[data-js="intro"]');
        var $window = $(window);
        var $body = $('body');
        var $forms = $('form');
        var $formInputs = $forms.find('.floating-label-form-group input, .floating-label-form-group textarea');

        $nav
            .on('click', 'a', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: $($anchor.attr('href')).offset().top
                }, 1500, 'easeInOutExpo');
                event.preventDefault();
            })
            .waypoint('sticky');

        $window
            .scroll(function() {
                var scroll = $window.scrollTop(), slowScroll = scroll/2;
                $intro.css({ transform: 'translateY(' + slowScroll + 'px)' });
            });

        // Highlight the top nav as scrolling occurs
        $body.scrollspy({
            target: '.navbar-collapse'
        });

        $formInputs
            .each(function(index, el) {
                $(this).parent().toggleClass('floating-label-form-group-with-value', !! $(el).val());
            });

        $forms
            .on('input propertychange', '.floating-label-form-group', function(e) {
                $(this).toggleClass('floating-label-form-group-with-value', !! $(e.target).val());
            })
            .on('focus', '.floating-label-form-group', function() {
                $(this).addClass('floating-label-form-group-with-focus');
            })
            .on('blur', '.floating-label-form-group', function() {
                $(this).removeClass('floating-label-form-group-with-focus');
            });
    });
});
