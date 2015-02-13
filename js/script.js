/**
 * @author edloidas
 * @link edloidas@gmail.com
 */

 function Intentions() {
    var that = this;

    /*
     * DOM Elements for scene manipulations
     */
    this.standbyElem = {};

    this.streetElem  = {};
    this.coupleElem  = {};

    this.audioElem   = {};
    this.toggleElem  = {};

    this.streetWidth = 0;
    this.coupleWidth = 0;

    /*
     * Preload counters
     */
    this.preloaded      = 0;
    this.totalToPreload = 3;


    /*
     * Initialization
     */
    this.init = function () {

        // Initialize the page elements

        this.standbyElem = document.getElementById( "pleaseStandBy" );

        this.streetElem  = document.getElementById( "street" );
        this.coupleElem  = document.getElementById( "couple" );

        this.audioElem   = document.getElementById( "song" );

        this.toggleElem  = document.getElementById( "tooglePlay" );

        // Saving sizes

        this.streetWidth = this.streetElem.offsetWidth;
        this.coupleWidth = this.coupleElem.offsetWidth;


        // Listeners of the preload
        document.addEventListener( 'preloaded', this.run.bind( this ), false );

        document.addEventListener( 'mousemove', this.animate.bind( this ), false );


        this.streetElem.addEventListener( 'load', this.notifyPreloaded.bind( this, "img street" ), false );
        this.coupleElem.addEventListener( 'load', this.notifyPreloaded.bind( this, "img couple" ), false );

        this.audioElem.addEventListener( 'canplaythrough', this.notifyPreloaded.bind( this, "audio" ), false );
        this.audioElem.addEventListener( 'ended', this.replayAudio.bind( this ), false );

        this.toggleElem.addEventListener( 'click', this.toggleAudio.bind( this ), false );

        this.audioElem.load();
    };


    /**
     * Notify element preload is complete and trigger event.
     */
    this.notifyPreloaded = function ( name ) {
        this.preloaded++;
        document.dispatchEvent( new CustomEvent( 'preloaded', { 'detail': name } ) );
    };

    /**
     * Check if everything is preloaded.
     */
    this.isPreloaded = function () {
        return this.preloaded === this.totalToPreload;
    };

    /**
     * Replay the audio from the beggining.
     */
    this.replayAudio = function () {
        this.audioElem.currentTime = 0;
        this.audioElem.play();
    };

    /**
     * Toggle play/pause state of the audio.
     */
    this.toggleAudio = function () {
        if ( this.audioElem.paused ) {
            this.audioElem.play();
            this.toggleElem.setAttribute( "class", "" );
        } else {
            this.audioElem.pause();
            this.toggleElem.setAttribute( "class", "paused" );
        }
    };

    /**
     * Animate background on mouse move.
     */
    this.animate = function ( event ) {
        // Use event.pageX / event.pageY here
        var moveX = ( document.body.offsetWidth / 2  - event.pageX );
        this.streetElem.style.marginLeft = Math.round( -this.streetWidth / 2 - moveX / 50 ) + 'px';
        this.coupleElem.style.marginLeft = Math.round( -this.coupleWidth / 2 + moveX / 100 ) + 'px';
    };

    /**
     * Run the scene.
     */
    this.run = function ( event ) {

        if ( this.isPreloaded() ) {

            this.standbyElem.style.display = "none";
            this.toggleAudio();
        }

    };
}


/*
 * Initialize
 */
var intentions = new Intentions();

window.onload = intentions.init();
