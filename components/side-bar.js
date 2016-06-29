import choo from 'choo';

const { view: html } = choo;

export default function sideBarView(params, state, send) {
  var allStores = state.stores.visibleStores;

  let tree = html`
    <side-bar>
      <button onclick=${() => send('stores:showAll')}>All Locations</button>
      <button onclick=${() => send('stores:showClosest')}>Closest Locations</button>
      <ul>
        ${
          allStores.map(item => {
            return html`
              <li>
                <a onclick=${() => send('stores:select', { payload: item })}>
                  ${item.name}${item.distance ? ': ' + item.distance + 'mi' : ''}
                </a>
              </li>
            `;
          })
        }
      </ul>
    </side-bar>
  `;

  return tree;
}
