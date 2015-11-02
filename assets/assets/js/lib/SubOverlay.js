var SubOverlay = function (bounds, map, divContent, latLngMarker, ajustPosition) {
    // Now initialize all properties.

    this.bounds_ = bounds;
    this.map_ = map;
    this.div_ = null;
    this.latLngMarker = latLngMarker;
    this.ajustPosition = ajustPosition;
    this.divContent = divContent;
    this.setMap(map);

    this.eventListeners_ = [];
    this.contextListener_ = null;
};

SubOverlay.prototype = new google.maps.OverlayView();

SubOverlay.prototype.onAdd = function () {
    // Create the DIV and set some basic attributes.
    var div = this.divContent;

    // Set the overlay's div_ property to this DIV
    this.div_ = div;

    // We add an overlay to a map via one of the map's panes.
    // We'll add this overlay to the overlayImage pane.
    var panes = this.getPanes();
    panes.overlayImage.appendChild(this.div_);

    var cancelHandler = function (e) {
        e.cancelBubble = true;
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    };

    // This handler ignores the current event in the InfoBox and conditionally prevents
    // the event from being passed on to the map. It is used for the contextmenu event.
    //
    var ignoreHandler = function (e) {
        e.returnValue = false;
        if (e.preventDefault) {
            e.preventDefault();
        }
        cancelHandler(e);
    };

    this.eventListeners_ = [];
    // Cancel event propagation.
    //
    // Note: mousemove not included (to resolve Issue 152)
    events = ["mousedown", "mouseover", "mouseout", "mouseup",
    "click", "dblclick", "touchstart", "touchend", "touchmove"];

    for (i = 0; i < events.length; i++) {

        this.eventListeners_.push(google.maps.event.addDomListener(this.div_, events[i], cancelHandler));
    }
    // Workaround for Google bug that causes the cursor to change to a pointer
    // when the mouse moves over a marker underneath InfoBox.
    this.eventListeners_.push(google.maps.event.addDomListener(this.div_, "mouseover", function (e) {
        this.style.cursor = "default";
    }));
    this.contextListener_ = google.maps.event.addDomListener(this.div_, "contextmenu", ignoreHandler);
};

SubOverlay.prototype.draw = function () {
    var overlayProjection = this.getProjection();
    //var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    //var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
    var pointMarkerPixel = overlayProjection.fromLatLngToDivPixel(this.latLngMarker);

    // Resize the image's DIV to fit the indicated dimensions.
    var div = this.div_;
    if (!div) return;
    var inforWindowsWidth = jQuery(div).width();
    var inforWindowsHeight = jQuery(div).height();

    var left = pointMarkerPixel.x - inforWindowsWidth / 2 + this.ajustPosition.left; // fix for perfect
    var top = pointMarkerPixel.y - inforWindowsHeight + this.ajustPosition.top;

    div.style.left = left + "px";
    div.style.top = top + "px";
    div.style.position = 'absolute';
};

SubOverlay.prototype.onRemove = function () {
    if (this.div_ && this.div_.parentNode) {
        this.div_.parentNode.removeChild(this.div_);
    }
    this.div_ = null;
};

SubOverlay.prototype.close = function () {
    this.onRemove();
}


