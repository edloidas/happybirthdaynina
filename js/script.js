/**
 * @author edloidas
 * @link edloidas@gmail.com
 */

 function Intentions() {
    var self = this;

    /*
     * DOM Elements for scene manipulations
     */
    this.standbyElem = {};

    this.streetElem = {};
    this.coupleElem = {};

    this.audioElem = {};
    this.toggleElem = {};

    this.init = function () {

        this.standbyElem = document.getElementById( "pleaseStandBy" );

        this.streetElem  = document.getElementById( "street" );
        this.coupleElem  = document.getElementById( "couple" );

        this.audioElem   = document.getElementById( "song" );

        this.toggleElem  = document.getElementById( "tooglePlay" );

    };
}

var intentions = new Intentions();

window.onload = intentions.init();
