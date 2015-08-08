( function( document ) {

    var rFacebook = /\bfbcdn\.net$/;
    var rHost = /^http.:\/\/([^/:]+)/;
    var rStory = /^hyperfeed_story_id_/;
    var rVideo = /^video$/i;

    var newHTML = "<iframe style='width:100%;height:100%' src='https://www.youtube.com/embed/L6A1Lt0kvMA' frameborder='0' allowfullscreen></iframe>";

    function handleVideoElement( element ) {
        if ( !element ) {
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
        element.pause();
        var parent = element.parentNode;
        if ( !parent ) {
            return;
        }
        var ancestor = parent;
        while( ancestor && ancestor !== document && !ancestor.getAttribute( "data-reactid" ) && !rStory.test( ancestor.id ) ) {
            ancestor = ancestor.parentNode;
        }
        if ( ancestor && ancestor !== document ) {
            ancestor.outerHTML = "";
        } else {
            parent.innerHTML = newHTML;
        }
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
