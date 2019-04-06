import {
    LOAD_ALBUMS_BEGIN,
    LOAD_ALBUMS_SUCCESS,
    LOAD_ALBUMS_FAILURE
} from './types';

export const loadAlbums = (dispatch) => {
    console.log('loading albums');
    console.log(dispatch);
    dispatch({type: LOAD_ALBUMS_BEGIN});
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
        .then(handleErrors)
        .then(res => res.json())
        .then(res => dispatch({type: LOAD_ALBUMS_SUCCESS, payload: res.feed.entry}));
};


const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};
