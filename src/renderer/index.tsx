import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './App/store';
import App from './App';
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
