import config from './components/map/config.js';
import Mapbox from './components/map/map.js';

let map = new Mapbox(config);
map.initialize();