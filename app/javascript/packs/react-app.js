import ReactOnRails from 'react-on-rails/client';
import App from '../bundles/components/App';
import "trix"
import "@rails/actiontext"

import "trix/dist/trix.css";
import "stylesheets/actiontext.css"; 

import HelloWorld from '../bundles/HelloWorld/components/HelloWorld';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  App,
});

