const initialState = {
    items: [],
    loading: false
};

const albumReducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOAD_ALBUMS_BEGIN":
            return {
                ...state,
                loading: true
            };

        case "LOAD_ALBUMS_SUCCESS":
            return {
                ...state,
                loading: false,
                items: action.payload
            };

        case "LOAD_ALBUMS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
                items: []
            };

        default:
            return state;
    }
};

export default albumReducer;
