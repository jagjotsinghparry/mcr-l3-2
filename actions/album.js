import {
    LOAD_ALBUMS_BEGIN,
    LOAD_ALBUMS_SUCCESS,
    LOAD_ALBUMS_FAILURE,
    TOGGLE_MODAL,
    SORT_ALBUMS_PRICE_ASC,
    SORT_ALBUMS_PRICE_DESC
} from './types';

export const loadAlbums = (dispatch) => {
    dispatch({type: LOAD_ALBUMS_BEGIN});
    fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
        .then(handleErrors)
        .then(res => res.json())
        .then(res => dispatch({type: LOAD_ALBUMS_SUCCESS, payload: res.feed.entry}))
        .catch(err => dispatch({type: LOAD_ALBUMS_FAILURE, payload: err}));
};

export const toggleModal = () => {
    return {
        type: TOGGLE_MODAL
    }
};

export const sortAlbums = (attribute, direction, dispatch) => {
    switch(attribute) {
        case 'price':
            if(direction === "ASC") {
                dispatch({type: SORT_ALBUMS_PRICE_ASC});
            } else {
                dispatch({type: SORT_ALBUMS_PRICE_DESC});
            }
    }
};

const handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};
