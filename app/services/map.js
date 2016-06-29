import Ember from 'ember';

const { on, A: boundArray, run, $ } = Ember;

export default Ember.Service.extend({
  searchMarkers: boundArray(),
  options: {
    zoom: 5,
    center: { lat: 42.33012354634199, lng: -70.95623016357422 }
  },

  setupMap: on('init', function () {
    var $container = $('<div/>');
    var options = this.get('options');

    google.maps.visualRefresh = true;
    $container.attr('id', 'map');

    var map = window.gmap = new google.maps.Map($container.get(0), options);

    this.setProperties({
      map,
      $el: $container
    });

    this._initEvents(map);
  }),

  _initEvents(map) {
    if (!map) {
      console.warn('mapService - Could not initialize events');
      return;
    }

    map.addListener('zoom_changed', run.bind(this, () => {
      var zoom = map.getZoom();

      this.set('zoom', zoom);
    }));
  },

  attachMap($parentEl) {
    var map = this.get('map');
    var $el = this.get('$el');

    $parentEl.append($el);
    google.maps.event.trigger(map, 'resize');

    return map;
  },

  addSearchMarkers(data, query) {
    var map = this.get('map');
    var markers = this.get('searchMarkers');

    if (map && data) {
      let bounds = new google.maps.LatLngBounds();
      let newMarkers = data.map(datum => {
        let title = datum.formatted_address || `Result for '${query}`;
        let place = {
          query: query,
          location: datum.geometry.location
        };

        if (datum.place_id) {
          place.placeId = datum.place_id;
          delete place.query;
        }

        bounds.extend(place.location);

        return new google.maps.Marker({
          title,
          place,
          map
        });
      });

      map.fitBounds(bounds);
      markers.pushObjects(newMarkers);
    }
  },

  clearSearchMarkers() {
    var markers = this.get('searchMarkers');

    if (markers) {
      markers.invoke('setMap', null);
      markers.clear();
    }
  }
});
