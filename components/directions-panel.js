import choo from 'choo';

const { view: html } = choo;

export default function directionsPanelView(params, state, send) {
  let tree = html`
    <directions-panel>
    </directions-panel>
  `;

  return tree;
}
