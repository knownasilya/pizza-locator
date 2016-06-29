import Ember from 'ember';

const { run, inject, observer: observes } = Ember;

export default Ember.Component.extend({
  routeService: inject.service('route'),
  mapService: inject.service('map'),

  init() {
    this._super(...arguments);
    this.initPopupEvents();
  },

  initPopupEvents() {
    const popup = new google.maps.InfoWindow();

    popup.setContent(`<div id='accesspoint-infowindow'></div>`);

    popup.addListener('closeclick', run.bind(this, function () {
      this.set('data', undefined);
    }));

    this.set('popup', popup);
  },

  didReceiveAttrs() {
    var data = this.get('data');
    var popup = this.get('popup');
    var map = this.get('mapService.map');

    if (popup.getPosition()) {
      this.set('activeData', undefined);
      popup.close();
    }

    if (!data || !data.data) {
      return;
    }

    popup.setPosition(data.ll);
    popup.open(map);
    this.set('activeData', Ember.Object.create(data));
  },

  clearPopupOnZoom: observes('mapService.zoom', function () {
    var zoom = this.get('mapService.zoom');
    var data = this.get('routeService.data');

    if (data && zoom < 13) {
      data.set('accessPoint', undefined);
    }
  })
});
