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


        // Listeners of the preload

        this.streetElem.addEventListener( 'load', this.notifyPreloaded.bind( this ), false );
        this.coupleElem.addEventListener( 'load', this.notifyPreloaded.bind( this ), false );

        this.audioElem.addEventListener( 'canplaythrough', this.notifyPreloaded.bind( this ), false );
        this.audioElem.addEventListener( 'ended', this.replayAudio.bind( this) , false );

        this.toggleElem.addEventListener( 'click', this.toggleAudio.bind( this) , false );

        document.addEventListener( 'preloaded', this.run.bind( this ) );
    };


    /**
     * Notify element preload is complete and trigger event.
     */
    this.notifyPreloaded = function () {
        this.preloaded++;
        document.dispatchEvent( new CustomEvent( 'preloaded' ) );
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
            this.toggleElem.setAttribute("class", "");
        } else {
            this.audioElem.pause();
            this.toggleElem.setAttribute("class", "paused");
        }
    };

    /**
     * Run the scene.
     */
    this.run = function ( event ) {

        if ( this.isPreloaded() ) {

            this.standbyElem.remove();
            this.toggleAudio();
        }

    };
}


/*
 * Initialize
 */
var intentions = new Intentions();

window.onload = intentions.init();
