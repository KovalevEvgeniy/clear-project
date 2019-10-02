/**
 * @ModuleCreator version 1.4.3
 * https://github.com/KovalevEvgeniy/ModuleCreator
 * @module ModuleName
 * @example $.moduleName(object)
 * or
 * @example $(selector).moduleName(object)
 * @author Author name
 **/
$.CreateModule({
	name: 'slider',
	options: {
		sliderOptions: {
			// slick options
		}
	},
	hooks: {
		create: function () {
			this._create();
		},
		bindEvent: function () {
			$(this.element).on(this._getEventName('click'), this._destroySlider);
		}
	},
	privateMethods: {
		_create: function () {
			this.element.slick(this._getOptions());
		},
		_getOptions () {
			return this._extend({}, this.options.sliderOptions);
		},
		_destroySlider (event) {
			this.element.slick('unslick');
		}
	},
	publicMethods: {}
});

$(() => {
	$('.my-slider-selector').slider({
		options: {
			sliderOptions: {
				infinite: true,
				slidesToShow: 1,
				dots: false
			}
		}
	});
});