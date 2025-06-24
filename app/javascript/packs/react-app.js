import ReactOnRails from 'react-on-rails/client';
import App from '../bundles/components/App';

import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
});