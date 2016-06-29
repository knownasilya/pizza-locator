/* global google: true */
import Ember from 'ember';
import observerThrottled from 'store-locator/utils/observer-throttled';

export default Ember.Component.extend({
  classNames: ['google-search', 'component'],
  placeholder: 'Search',
  showResults: true,
  searchResults: Ember.A(),
  selectedIndex: -1,

  didInsertElement() {
    var $temp = Ember.$('<div/>');
    var service = new google.maps.places.AutocompleteService();
    var placesService = new google.maps.places.PlacesService($temp.get(0));

    this.setProperties({
      autoCompleteService: service,
      placesService: placesService
    });

    Ember.$('body').on('click', this.bodyClick.bind(this));
  },

  click(event) {
    console.log(event);
  },

  bodyClick(event) {
    var isClassNameString = typeof(event.target.className) === 'string';
    var isClassSearchQuery = isClassNameString && event.target.className.indexOf('search-query');

    if (this.isDestroyed || isClassSearchQuery) {
      return;
    }

    Ember.run(() => {
      this.set('showResults', false);
    });
  },

  willDestroyElement() {
    Ember.$('body').off('click', this.bodyClick.bind(this));
  },

  searchQueryChanged: observerThrottled('searchQuery', function () {
    var input = this.get('searchQuery');
    var bounds = this.get('bounds');
    var service = this.get('autoCompleteService');
    var selectedResult = this.get('selectedResult');
    var queryLikeSelectedAddress = selectedResult && selectedResult.address === input;

    if (!input || Ember.isEmpty(input) || !service || queryLikeSelectedAddress) {
      this.get('searchResults').clear();
      return;
    }

    service.getPlacePredictions({ input, bounds }, (results, status) => {
      if (status !== 'OK') {
        return;
      }

      this.set('selectedIndex', -1);

      Ember.RSVP.all(results.map(item => this.fetchResultDetails(item.place_id)))
        .then(detailsResults => {
          var filtered = detailsResults.filter(function (result) {
            if (!result) {
              return false;
            }

            return result && result.geometry && bounds.contains(result.geometry.location);
          });

          this.set('searchResults', filtered.map(item => {
            item.isSelected = false;
            item.address = item.formatted_address;
            item.icon = item.icon && item.icon.indexOf('https') === -1 ? item.icon.replace('http', 'https') : item.icon;

            return Ember.Object.create(item);
          }));
          this.set('showResults', true);
        });
    });
  }, 300, true),

  keyDown(event) {
    if (!this.get('searchResults')) {
      return;
    }

    var lastSelected = this.get('lastSelected');
    var selectedIndex = this.get('selectedIndex');
    var searchResults = this.get('searchResults');
    var length = searchResults.get('length');
    var lastObject = searchResults.objectAt(selectedIndex);
    var newIndex, selectedObject;

    switch (event.keyCode) {
      // down key
      case 40: {
        if (selectedIndex === length - 1) {
          return;
        }

        newIndex = this.incrementProperty('selectedIndex');
        break;
      }

      // up key
      case 38: {
        if (selectedIndex === -1) {
          return;
        }

        newIndex = this.decrementProperty('selectedIndex');
        break;
      }

      // enter key
      case 13: {
        this.send('select', lastSelected);
        event.preventDefault();
        return;
      }

      // escape key
      case 27: {
        this.send('clearSelected');
        return;
      }

      default: {
        return;
      }
    }

    if (lastSelected) {
      lastSelected.set('isSelected', false);
    }

    if (event.keyCode === 40 || event.keyCode === 38) {
      selectedObject = searchResults.objectAt(newIndex);

      if (selectedObject) {
        selectedObject.toggleProperty('isSelected');
        this.set('lastSelected', selectedObject);
      }

      if (lastObject) {
        lastObject.set('isSelected', false);
      }
    }
  },

  actions: {
    toggleResults() {
      this.toggleProperty('showResults');
    },

    select(item) {
      if (!item) {
        return;
      }

      this.set('selectedResult', item);
      this.sendAction('selected', item, this.get('searchQuery'));
      this.set('searchQuery', item.address);
      this.send('clearSelected');
    },

    clearSelected(clearValue, explicit) {
      var lastSelected = this.get('lastSelected');

      if (lastSelected) {
        lastSelected.set('isSelected', false);
      }

      if (clearValue) {
        this.set('searchQuery', '');
      }
      this.get('searchResults').clear();
      this.setProperties({
        selectedIndex: -1,
        lastSelected: undefined
      });

      if (explicit && this.get('onclear')) {
        this.sendAction('onclear');
      }
    }
  },

  fetchResultDetails(placeId) {
    var placesService = this.get('placesService');

    return new Ember.RSVP.Promise(function (resolve) {
      placesService.getDetails({ placeId: placeId }, function (details) {
        resolve(details);
      });
    });
  }
});
