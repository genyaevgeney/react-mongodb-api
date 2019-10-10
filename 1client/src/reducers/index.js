import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import tracks from './tracks';
import playlists from './playlists';
import filterTracks from './filterTracks';
import donations from './donations';

import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
	errors: errorReducer,
	auth: authReducer,
	routing: routerReducer,
	tracks,
	playlists,
	filterTracks,
	donations
});
