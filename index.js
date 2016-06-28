import choo from 'choo';
import stores from './stores';
debugger;
const app = choo();

app.model({
  namespace: 'stores',
  state: {
    all: stores
  }
});

const mainView = (params, state, send) => {
  var allStores = state.stores.all;
  return choo.view`
    <main class="app">
      <ul>
        ${allStores.map(item => choo.view`<li>${item.name}</li>`)}
      </ul>
    </main>
  `;
};

app.router((route) => {
  return [
    route('/', mainView)
  ];
});

const tree = app.start();

document.body.appendChild(tree);
