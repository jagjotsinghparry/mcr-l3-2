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
            }

        default:
            return state;
    }
};

export default albumReducer;
