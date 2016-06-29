import choo from 'choo';

const { view: html } = choo;
const renderer = new google.maps.DirectionsRenderer();

export default function directionsPanelView(params, state, send) {
  let tree = html`
    <directions-panel>
      <h3>Directions</h3>
      <button onclick=${() => send('stores:updateDirections', { payload: false })}>Clear Directions</button>
    </directions-panel>
  `;

  if (state.stores.directions) {
    renderer.setDirections(state.stores.directions);
    renderer.setMap(state.stores.map);
    renderer.setPanel(tree);
  } else {
    renderer.setMap(null);
  }

  state.stores.renderer = renderer;

  return tree;
}
