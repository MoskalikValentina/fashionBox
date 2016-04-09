var app = app || {};

app.sliderWithScroll = (function($, slider){
	var $sliderWrapper;

	function init (wrappers) {
		$sliderWrapper = $(wrappers);
		initSlider($sliderWrapper);
		$sliderWrapper.each(function(index, el) {
			var obj = {};
			obj.$slider = initSlider(el);
			obj.$scroll = initScroller ( obj.$slider );

			events(obj);
		});
	}

	function initSlider (el) {
			var $wrap = $(el),
				$slider = $('.slider', $wrap);

			slider({'target': $slider});

			return $slider;
	}


	function initScroller ( $slider ) {
		var $scroll = getScroll(),
			sliderData = $slider.data('owlCarousel');

		$slider.parent().append( $scroll );
		$scroll.children().width(getScrollWidthByItems(
					$scroll.children(),
					sliderData.visibleItems.length,
					sliderData.itemsAmount
				));
		$scroll.children().draggable({'containment': 'parent'});

		updateScrollPosition(
				$scroll,
				sliderData.currentItem,
				sliderData.itemsAmount - sliderData.visibleItems.length,
				0
			);
		return $scroll.children();
	}

	function getScrollWidthByItems ( $el, x, count ) {
		var $wrap = $el.parent(),
			width = $wrap.width() * ( x / count );
		return width;
	}

	function updateScrollPosition ($el, current, total) {
		var $wrap = $el.parent(),
			pos = ( $wrap.width() - $el.width() ) / total * ( current ) ;
		$el.css('left', pos);
	}



	function getScroll (argument) {
		var $wrap = $('<div>'),
			$drag = $('<div>');

		$wrap.addClass('scroll-wrapper');
		$drag.addClass('scroll-control');

		$wrap.append($drag);

		return $wrap;
	}



	function events (data) {
		var	$slider = data.$slider,
			$scroll = data.$scroll
			// scrollWidth = $scroll.width(),
			// scrollWrapWidth = $scroll.parent().width(),
		$slider.on('owlCarousel.befre', function(event, data) {
			event.preventDefault();
			updateScrollPosition(
						$scroll, 
						data.currentItem,
						data.itemsAmount - data.visibleItems.length,
						200
					);
		});


		$scroll.on('drag', function(event, ui) {
				var $sc = ui.helper;
				var $sl = $sc.closest('.slider_wrapper').find('.slider.owl-carousel');
				sliderData = $sl.data('owlCarousel'),
				scrollRowWidth = $sc.parent().width() - $sc.width();
				var pos = sliderData.maximumPixels * (ui.position.left / scrollRowWidth);
				
				$sl.find('.owl-wrapper').css(
					'transform', 'translate3d(' + pos + 'px, 0px, 0px)'
					);


		});

		$scroll.on('dragstop', function(event, ui) {
				var $sc = ui.helper;
				var $sl = $sc.closest('.slider_wrapper').find('.slider.owl-carousel');
				sliderData = $sl.data('owlCarousel'),
				scrollRowWidth = $sc.parent().width() - $sc.width();

				current = Math.round((sliderData.itemsAmount - sliderData.visibleItems.length) * (ui.position.left / scrollRowWidth));

				sliderData.currentItem = current;
				sliderData.goTo(current);
		});

	}

	return {
		init: init
	};

})($);
