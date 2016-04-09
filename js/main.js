$(function(){
	$('.js-select').select2({
     /* dropdownParent: $('#decorationScroll_select')*/
    });
    var $popup = $('.popup'),
        $overlay = $('#overlay'),
        $link_popup = $('a.show_popup'),
        $closePopup = $('a.close'),
        $btn_open_search = $('#btn_open_search'),
        $search_header= $('#searchHeader'),
        $menu_btn =$('.menu_small'),
        $nav = $('nav'),
        $win = $(window);
    $win.on('resize',  function(event) {
        event.preventDefault();
       
    });  
    $link_popup.on('click', function(event) {
        event.preventDefault();
        $popup.fadeOut(100);
        $('div.'+$(this).attr("rel")).fadeIn(500);
        $overlay.fadeIn(100);
        return false;       
    });
    $closePopup.on('click', function(event) {
        event.preventDefault();
        $(this).parent().fadeOut(100);
        $overlay.fadeOut(100);
        return false;   
    });
    $overlay.on('click', function(event) {
        event.preventDefault();
        $popup.fadeOut(100);
        $overlay.fadeOut(100);
        return false;   
    });
        var $winWidht = $win.width(),
            $distance = $winWidht*0.11,
            $carouselWidht = ($winWidht*0.785) - ($distance*2),
            $carouselHeight = $winWidht*0.233;


    $('#carousel3d_header').carousel({
        num: 3,
        maxWidth: $carouselWidht,
        maxHeight: $carouselHeight,
        distance: $distance,
        animationTime: 1000,
        showTime: 5000/*,
        autoPlay: true*/
    });
     $(".scrollDecoration").mCustomScrollbar({
        theme:"dark"
     });
     $("#decorationScroll_select").mCustomScrollbar({
        theme:"dark"
     });
     /*$(".select2-selection select2-selection--single").on('click',  function(event) {
         event.preventDefault();
         
     });*/
    //     $(".owl-carousel.content_product").owlCarousel({
    //     loop:true,
    //     responsiveClass:true,
    //     responsive:{
    //         0:{
    //             items:2
    //         },
    //         600:{
    //             items:3,
    //             margin:10
    //         },
    //         1000:{
    //             items:4,
    //             margin:20
    //         },
    //         1400:{
    //             items:5,
    //             margin:30
    //         }
    //     }
    // });
    $('.owl-carousel.with_stage_padding').owlCarousel({
        stagePadding: 70,
        loop:true,
        margin:13,
        lazyLoad:true,
        /*nav:true,*/
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:4
            },
            1400:{
                items:6
            }
        }
    });
    app.sliderWithScroll.init($('.slider_wrapper'));
   

})