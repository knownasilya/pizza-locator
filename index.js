import choo from 'choo';
import stores from './stores';
import GoogleMap from './components/google-map';
import SideBar from './components/side-bar';

const app = choo();
const { computeDistanceBetween } = google.maps.geometry.spherical;
const iw = new google.maps.InfoWindow();

app.model({
  namespace: 'stores',
  state: {
    visibleStores: stores,
    userLocation: { lat: 42.33012354634199, lng: -70.95623016357422 }
  },

  reducers: {
    showAll(action, state) {
      state.visibleStores = stores;
      return state;
    },

    updateVisible(action, state) {
      state.visibleStores.forEach(store => {
        if (store.marker) {
          store.marker.setMap(null);
        }
      });
      state.visibleStores = action.payload;
      state.userLocation = action.location.toJSON();
      return state;
    }
  },

  effects: {
    select(action, state, send) {
      var store = action.payload;

      iw.setPosition({ lat: store.lat, lng: store.lng });
      iw.setContent(store.name);
      iw.open(state.map, store.marker);
    },

    showClosest(action, state, send) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        var closest = stores.map(store => {
          let distance = computeDistanceBetween(new google.maps.LatLng(store.lat, store.lng), userLocation);
          // convert meters to miles, rounded up
          store.distance = Math.ceil(distance * 0.000621371);
          return store;
        }).filter(store => store.distance < 100);

        send('stores:updateVisible', { payload: closest, location: userLocation });
      });
    }
  }
});


const mainView = (params, state, send) => {
  return choo.view`
    <main class="app">
      ${GoogleMap(params, state, send)}
      ${SideBar(params, state, send)}
    </main>
  `;
};


app.router((route) => {
  return [
    route('/', mainView)
  ];
});

const tree = app.start();

document.body.appendChild(tree);
