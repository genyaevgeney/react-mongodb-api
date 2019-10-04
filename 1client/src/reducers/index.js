import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import tracks from './tracks';
import playlists from './playlists';
import filterTracks from './filterTracks';
import donations from './donations';

export default combineReducers({
  routing: routerReducer,
  tracks,
  playlists,
  filterTracks,
  donations
});
