import React from 'react';
import { render } from 'react-dom';
import Main from './components/Main'

render(<Main/>, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./components/Main', () => {
    const NextRoot = require('./components/Main'); // eslint-disable-line global-require
    render(<NextRoot store={store} history={history} />,document.getElementById('root'));
  });
}
