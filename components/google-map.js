import choo from 'choo';
import onload from 'on-load';
import styles from '../map-styles.json';

const { view: html } = choo;

export default function mapView(params, state, send) {
  let stores = state.stores.visibleStores;
  let allMarkers = stores.map(store => {
    return new google.maps.Marker({
      position: { lat: store.lat, lng: store.lng },
      title: store.name,
      label: 'P'
    });
  });
  let tree = html`
    <google-map>
    </google-map>
  `;

  onload(tree, () => {
    let map = new google.maps.Map(tree, {
      center: state.stores.userLocation,
      zoom: 5,
      styles
    });

    allMarkers.forEach(marker => marker.setMap(map));
    google.maps.event.trigger(map, 'resize');
  });

  return tree;
}
