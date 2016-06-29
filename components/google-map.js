import choo from 'choo';
import onload from 'on-load';
import styles from '../map-styles.json';

const { view: html } = choo;
let mapDiv = document.createElement('div');
mapDiv.classList.add('map-container');
let map = new google.maps.Map(mapDiv, {
  center: { lat: 42.33012354634199, lng: -70.95623016357422 },
  zoom: 5,
  styles
});

export default function mapView(params, state, send) {
  let tree = html`
    <google-map>
    </google-map>
  `;

  //onload(tree, () => {
    loadMap(tree, state, send);
  //});

  return tree;
}

function loadMap(tree, state, send) {
  let stores = state.stores.visibleStores;
  tree.appendChild(mapDiv);

  stores.forEach(store => {
    if (!store.marker) {
      store.marker = new google.maps.Marker({
        position: { lat: store.lat, lng: store.lng },
        title: store.name,
        label: 'P'
      });
      store.marker.addListener('click', () => send('stores:select', { payload: store }));
    }
  });

  stores.forEach(store => store.marker.setMap(map));
  setTimeout(() => {
    google.maps.event.trigger(map, 'resize');
  }, 500);
  state.stores.map = map;
}
