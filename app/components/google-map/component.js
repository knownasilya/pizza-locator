import Ember from 'ember';

const { inject, computed } = Ember;

export default Ember.Component.extend({
  mapService: inject.service('mapService'),

  didInsertElement() {
    this._super();
    this.setupMap();
  },

  setupMap() {
    const mapService = this.get('mapService');

    if (mapService) {
      let map = mapService.attachMap(this.$().find('.map-container'));

      this.set('map', map);
    }
  }
});
