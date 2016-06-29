import choo from 'choo';

const { view: html } = choo;

export default function userLocationView(params, state, send) {
  let tree;

  if (state.stores.location) {
    tree = html`
      <p>
        You are located at: ${state.stores.location}
      </p>
    `;
  } else {
    tree = html`<span></span>`;
  }

  return tree;
}
