import choo from 'choo';

const { view: html } = choo;

export default function userLocationView(params, state, send) {
  let tree = html`
    <p>
      ${state.stores.location ? `You are located at: ${state.stores.location}` : ''}
      <br>
      <label>
        Distance: <input type="number" value=${state.stores.distance} oninput=${(e) => send('stores:showClosest', { distance: e.target.value })} placeholder="distance (miles)">
      </label>
    </p>
  `;

  return tree;
}
