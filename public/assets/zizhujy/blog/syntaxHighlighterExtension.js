;
(function ($) {
    $(function () {
        // Line wrap back
        var shLineWrap = function () {
            // Fix by Jeff Tian that make it work with the collapsed setting
            $('.syntaxhighlighter:not(.collapsed)').each(function () {
                // Fetch
                var $sh = $(this),
                    $gutter = $sh.find('td.gutter'),
                    $code = $sh.find('td.code')
                ;
                // Cycle through lines
                $gutter.children('.line').each(function (i) {
                    // Fetch
                    var $gutterLine = $(this),
                        $codeLine = $code.find('.line:nth-child(' + (i + 1) + ')')
                    ;
                    //alert($gutterLine);
                    // Fetch height
                    var height = $codeLine.height() || 0;
                    if (!height) {
                        height = 'auto';
                    }
                    else {
                        height = height += 'px';
                        //alert(height);
                    }
                    // Copy height over
                    $gutterLine.attr('style', 'height: ' + height + ' !important'); // fix by Edi, for JQuery 1.7+ under Firefox 15.0
                });
            });
        };

        // Line wrap back when syntax highlighter has done it's stuff
        var shLineWrapWhenReady = function () {
            if ($('.syntaxhighlighter').length === 0) {
                setTimeout(shLineWrapWhenReady, 100);
            }
            else {
                shLineWrap();
                // Fix by Jeff Tian that make it work with the collapsed setting
                if ($(".syntaxhighlighter.collapsed").length > 0) {
                    setTimeout(shLineWrapWhenReady, 100);
                }
            }
        };

        // Fire
        shLineWrapWhenReady();

        // Fix by Jeff Tian that make it work after window resized.
        $(window).resize(function (event) {
            shLineWrapWhenReady();
        });
    });
})(jQuery);