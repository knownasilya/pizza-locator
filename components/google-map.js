import choo from 'choo';
import onload from 'on-load';
import styles from '../map-styles.json';

const { view: html } = choo;

export default function mapView(params, state, send) {
  let tree = html`
    <google-map>
    </google-map>
  `;

  onload(tree, () => {
    loadMap(tree, state);
  });

  return tree;
}

function loadMap(tree, state) {
  let map = new google.maps.Map(tree, {
    center: state.stores.userLocation,
    zoom: 5,
    styles
  });
  let stores = state.stores.visibleStores;

  stores.forEach(store => {
    store.marker = new google.maps.Marker({
      position: { lat: store.lat, lng: store.lng },
      title: store.name,
      label: 'P'
    });
  });

  stores.forEach(store => store.marker.setMap(map));
  google.maps.event.trigger(map, 'resize');
  state.stores.map = map;
}
