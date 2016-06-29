import choo from 'choo';
import onload from 'on-load';

const { view: html } = choo;

export default function mapView(params, state, send) {
  let stores = state.stores.all;
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
      center: { lat: 42.33012354634199, lng: -70.95623016357422 },
      zoom: 11
    });

    allMarkers.forEach(marker => marker.setMap(map));

    state.app.map = map;
  });

  return tree;
};
