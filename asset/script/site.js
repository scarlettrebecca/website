(function() {
    'use strict';

    window.onload = function () {

        // Configure Highslide
        hs.align = 'center';
        hs.captionEval = 'this.thumb.alt';
        hs.dimmingDuration = hs.expandDuration = 200;
        hs.dimmingOpacity = 0.75;
        hs.graphicsDir = '/asset/image/highslide/';
        hs.outlineType = 'rounded-white';
        hs.showCredits = false;

        // Instantiate everything
        var slideshows = qs('.slideshow').forEach(createSlideshow);
        var highslides = qs('.highslide').forEach(createHighslide);

    }

    // Create a slideshow
    function createSlideshow (element) {

        var DEFAULT_PLAY_SPEED = 2500;
        var SLIDE_SELECTOR = '.slideshow__slide';
        var CURRENT_SLIDE_CLASS = 'slideshow__slide--current';
        var CURRENT_SLIDE_SELECTOR = '.' + CURRENT_SLIDE_CLASS;

        var slideshow = {

            init: function (element) {
                this.element = element;
                this.playSpeed = parseInt(element.getAttribute('data-play-speed') || DEFAULT_PLAY_SPEED, 10);

                this.slideElements = qs(SLIDE_SELECTOR, this.element);
                this.currentSlideElement = this.getCurrentSlideElement();
                this.setCurrentSlideElement(this.currentSlideElement);

                this.play();
            },

            play: function () {
                var that = this;
                if (!this._interval) {
                    this._interval = setInterval(function () {
                        that.nextSlide();
                    }, this.playSpeed);
                }
            },

            pause: function () {
                if (this._interval) {
                    clearInterval(this._interval);
                    delete this._interval;
                }
            },

            getCurrentSlideElement: function () {
                return qs(CURRENT_SLIDE_SELECTOR, this.element)[0] || this.slideElements[0];
            },

            setCurrentSlideElement: function (newSlideElement) {
                var that = this;
                this.slideElements.forEach(function (slideElement) {
                    if (slideElement === newSlideElement) {
                        addClass(slideElement, CURRENT_SLIDE_CLASS);
                    } else {
                        removeClass(slideElement, CURRENT_SLIDE_CLASS);
                    }
                });
                that.currentSlideElement = newSlideElement;
            },

            getCurrentSlideIndex: function () {
                return this.slideElements.indexOf(this.currentSlideElement);
            },

            getSlideIndexBounds: function () {
                return {
                    min: 0,
                    max: this.slideElements.length - 1
                }
            },

            getNextSlide: function () {
                var index = this.getCurrentSlideIndex();
                var indexBounds = this.getSlideIndexBounds();
                var nextIndex = (index < indexBounds.max ? index + 1 : indexBounds.min);
                return this.slideElements[nextIndex];
            },

            nextSlide: function () {
                this.setCurrentSlideElement(this.getNextSlide());
            },

            getPreviousSlide: function () {
                var index = this.getCurrentSlideIndex();
                var indexBounds = this.getSlideIndexBounds();
                var previousIndex = (index > indexBounds.min ? index - 1 : indexBounds.max);
                return this.slideElements[previousIndex];
            },

            previousSlide: function () {
                this.setCurrentSlideElement(this.getPreviousSlide());
            }

        };
        slideshow.init(element);
        return slideshow;
    }

    // Create a highslide
    function createHighslide (element) {
        var highslide = {

            init: function (element) {
                this.element = element;
                this.bindEvents();
            },

            bindEvents: function () {
                this.element.addEventListener('click', this.expand.bind(this), false);
            },

            expand: function (event) {
                hs.expand(this.element);
                if (event) {
                    event.preventDefault();
                }
            }

        };
        highslide.init(element);
        return highslide;
    }

    function qs (selector, context) {
        if (context) {
            return slice(context.querySelectorAll(selector));
        }
        return slice(document.querySelectorAll(selector));
    }

    function addClass (element, className) {
        removeClass(element, className);
        element.className = element.className + ' ' + className;
    }

    function removeClass (element, className) {
        element.className = element.className.replace(className, '');
    }

    function hasClass (element, className) {
        return (
            element.className.indexOf(className + ' ') === 0 ||
            element.className.indexOf(' ' + className + ' ') !== -1 ||
            element.className.indexOf(' ' + className) === element.className.length - className.length - 1
        );
    }

    function slice (array) {
        return Array.prototype.slice.call(array);
    }

}());
