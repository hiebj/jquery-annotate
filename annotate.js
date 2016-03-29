(function($) {
    var annotationTpl = [
            '<div class="annotation">',
                '<div class="annotation-pill">',
                    '{{annotation}}',
                '</div>',
            '</div>'
        ];

    $.fn.annotate = $annotate;
    $.fn.clearAnnotations = clearAnnotations;

    function $annotate(options) {
        options = options || {};
        var annotateFn = options.annotationRenderer || tagIdRenderer,
            detailsFn = typeof options.detailsRenderer !== 'undefined' ?
                options.detialsRenderer : layoutRenderer,
            annotatePseudoEls = options.pseudoEls;
        this.addClass('annotate');
        if (annotatePseudoEls) {
            this.addClass('a-pseudo');
        }
        this.each(function() {
            var $el = $(this);
            if (!$el.data('annotated')) {
                $el.data('annotated', true);
                renderAnnotation.call(this, annotateFn, detailsFn);
            }
        });
        return this;
    }

    function renderAnnotation(annotateFn, detailsFn) {
        var $el = $(this),
            annotation = annotationTpl.slice();
        annotation[2] = annotateFn.call(this);
        annotation = $(annotation.join(''));
        $el.prepend(annotation);
        bindEvents.call(this, annotation);
        if (detailsFn) {
            annotation.find('.annotation-pill').append('<pre>');
            observeDetailsLoop.call(this, detailsFn);
        }
        return annotation;
    }

    function bindEvents($annotation) {
        var $el = $(this),
            freeze = false;
        $annotation
            .children('.annotation-pill')
            .hover(function() {
                $el.addClass('a-details');
            }, function() {
                !freeze && $el.removeClass('a-details');
            })
            .click(function() {
                freeze = !freeze;
                $el.toggleClass('a-freeze');
            });
    }

    function observeDetailsLoop(detailsFn) {
        var dom = this,
            $el = $(this),
            $details = $el.find('.annotation-pill pre'),
            lastDetails;
        observeDetails();

        function observeDetails() {
            var newDetails;
            if ($el.data('annotated')) {
                newDetails = detailsFn.call(dom);
                if (newDetails !== lastDetails) {
                    $details.html(newDetails);
                    lastDetails = newDetails;
                }
                window.requestAnimationFrame(observeDetails);
            }
        }
    }

    function clearAnnotations() {
        $(this).removeClass('annotate a-pseudo a-details a-freeze')
            .data('annotated', false)
            .children('.annotation')
            .remove();
    }

    function tagIdRenderer() {
        return this.tagName.toLowerCase() + '#' + this.id;
    }

    function layoutRenderer() {
        var style = window.getComputedStyle(this);
        return [
            'display: ' + style.display,
            'position: ' + style.position,
            'float: ' + style.float,
            'clear: ' + style.clear + ';'
        ].join(';\n');
    }
})(jQuery);
