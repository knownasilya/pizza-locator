import Ember from 'ember';

const { inject, isArray } = Ember;

export default Ember.Route.extend({
  mapService: inject.service('map'),

  actions: {
    mapSearchResult(results, query) {
      var mapService = this.get('mapService');

      if (!isArray(results)) {
        results = [results];
      }

      mapService.addSearchMarkers(results, query);
    },

    clearSearchMarkers() {
      var mapService = this.get('mapService');
      mapService.clearSearchMarkers();
    }
  }
});
