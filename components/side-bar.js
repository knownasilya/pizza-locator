import choo from 'choo';

const { view: html } = choo;

export default function sideBarView(params, state, send) {
  var allStores = state.stores.visibleStores;

  let tree = html`
    <side-bar>
      <button onclick=${() => send('stores:showAll')}>All Locations</button>
      <button onclick=${() => send('stores:showClosest')}>Closest Locations</button>
      <ul>
        ${allStores.map(item => choo.view`<li>${item.name}${item.distance ? ': ' + item.distance + 'mi' : ''}</li>`)}
      </ul>
    </side-bar>
  `;

  return tree;
}
