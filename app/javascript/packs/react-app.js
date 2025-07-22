import ReactOnRails from 'react-on-rails/client';
import App from '../bundles/components/App';

import "../stylesheets/devise.css"
import "../stylesheets/global.css"

import "trix"
import "@rails/actiontext"

import "trix/dist/trix.css";
import "stylesheets/actiontext.css"; 

ReactOnRails.register({
  App,
});

