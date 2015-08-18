( function( document ) {

    var rFacebook = /\bfbcdn\.net$/;
    var rHost = /^http.:\/\/([^/:]+)/;
    var rStory = /^hyperfeed_story_id_/;
    var rVideo = /^video$/i;

    var cacheHTML = "<a class=\"nofreebooting-warning\" href=\"https://www.youtube.com/watch?v=L6A1Lt0kvMA\"target=\"_blank\">This Video may be Freebooted!</a>" +
        "<a class=\"nofreebooting-ok\">Show Video</a>";

    function styleValue( name, value ) {
        return name + ":" + value + "px !important;";
    }

    function handleVideoElement( element ) {
        if ( !element ) {
            return;
        }
        if ( element._nofreebooting ) {
            return;
        }
        var src = element.src;
        if ( !src ) {
            return;
        }
        var parsed = rHost.exec( src );
        if ( !parsed ) {
            return;
        }
        if ( !rFacebook.test( parsed[ 1 ] ) ) {
            return;
        }
        var parent = element.parentNode;
        if ( !parent ) {
            return;
        }
        element._nofreebooting = true;
        element.pause();
        var cache = document.createElement( "div" );
        cache.className = "nofreebooting";
        cache.innerHTML = cacheHTML;
        cache.getElementsByClassName( "nofreebooting-ok" )[ 0 ].onclick = function() {
            cache.outerHTML = "";
        };
        parent.style.position = "relative";
        parent.appendChild( cache );
    }

    var forEach = Array.prototype.forEach
    var videoElements = document.getElementsByTagName( "video" );

    ( new MutationObserver( function() {
        forEach.call( videoElements, handleVideoElement );
    } ) ).observe( document.documentElement, {
        childList: true,
        subtree: true
    } );

} )( document );
