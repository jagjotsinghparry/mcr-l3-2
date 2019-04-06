const initialState = {
    items: [],
    loading: false,
    modal: false,
    originalItems: []
};

function comparePriceAsc(a, b) {
    if (parseFloat(a['im:price']['attributes']['amount']) < parseFloat(b['im:price']['attributes']['amount']))
        return -1;
    if (parseFloat(a['im:price']['attributes']['amount']) > parseFloat(b['im:price']['attributes']['amount']))
        return 1;
    return 0;
}

function comparePriceDesc(a, b) {
    if (parseFloat(a['im:price']['attributes']['amount']) < parseFloat(b['im:price']['attributes']['amount']))
        return 1;
    if (parseFloat(a['im:price']['attributes']['amount']) > parseFloat(b['im:price']['attributes']['amount']))
        return -1;
    return 0;
}

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
                items: action.payload,
                originalItems: action.payload
            };

        case "LOAD_ALBUMS_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
                items: []
            };

        case "TOGGLE_MODAL":
            return {
                ...state,
                modal: !state.modal
            };

        case "SORT_ALBUMS_PRICE_ASC":
            var newItems = state.items.sort(comparePriceAsc);
            return {
                ...state,
                items: newItems,
                modal: false
            };

        case "SORT_ALBUMS_PRICE_DESC":
            var newItems = state.items.sort(comparePriceDesc);
            return {
                ...state,
                items: newItems,
                modal: false
            };

        default:
            return state;
    }
};

export default albumReducer;
