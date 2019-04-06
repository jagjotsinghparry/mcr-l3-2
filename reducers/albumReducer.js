import moment from "moment";

const initialState = {
    items: [],
    loading: false,
    modal: false,
    originalItems: [],
    searchQuery: ''
};

function compareAsc(a, b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}

function compareDesc(a, b) {
    if (a < b)
        return 1;
    if (a > b)
        return -1;
    return 0;
}

function titleSearch(objList, text){
    if(undefined === text || text === '' ) return objList;
    return objList.filter(product => {
        return (product['im:name']['label'].toString().toLowerCase().indexOf(text.toLowerCase()) > -1);
    });
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
            var newItems = state.originalItems.slice(0).sort((a, b) => {
                a = parseFloat(a['im:price']['attributes']['amount']);
                b = parseFloat(b['im:price']['attributes']['amount']);
                return compareAsc(a, b);
            });
            return {
                ...state,
                items: newItems,
                modal: false
            };

        case "SORT_ALBUMS_PRICE_DESC":
            var newItems = state.originalItems.slice(0).sort((a, b) => {
                a = parseFloat(a['im:price']['attributes']['amount']);
                b = parseFloat(b['im:price']['attributes']['amount']);
                return compareDesc(a, b);
            });
            return {
                ...state,
                items: newItems,
                modal: false
            };

        case "SORT_ALBUMS_ARTIST_ASC":
            var newItems = state.originalItems.slice(0).sort((a, b) => {
                a = a['im:artist']['label'].toLowerCase();
                b = b['im:artist']['label'].toLowerCase();
                return compareAsc(a, b);
            });
            return {
                ...state,
                items: newItems,
                modal: false
            };

        case "SORT_ALBUMS_ARTIST_DESC":
            var newItems = state.originalItems.slice(0).sort((a, b) => {
                a = a['im:artist']['label'].toLowerCase();
                b = b['im:artist']['label'].toLowerCase();
                return compareDesc(a, b);
            });
            return {
                ...state,
                items: newItems,
                modal: false
            };

        case "SORT_ALBUMS_RELEASE_DATE_ASC":
            var newItems = state.originalItems.slice(0).sort((a, b) => {
                a = parseInt(moment(a['im:releaseDate']['label']).format('YYYY'));
                b = parseInt(moment(b['im:releaseDate']['label']).format('YYYY'));
                return compareAsc(a, b);
            });
            return {
                ...state,
                items: newItems,
                modal: false
            };

        case "SORT_ALBUMS_RELEASE_DATE_DESC":
            var newItems = state.originalItems.slice(0).sort((a, b) => {
                a = parseInt(moment(a['im:releaseDate']['label']).format('YYYY'));
                b = parseInt(moment(b['im:releaseDate']['label']).format('YYYY'));
                return compareDesc(a, b);
            });
            return {
                ...state,
                items: newItems,
                modal: false
            };

        case 'SORT_ALBUMS_REMOVE':
            return {
                ...state,
                items: state.originalItems,
                modal: false
            };

        case "SEARCH_ALBUMS":
            var newItems = titleSearch(state.originalItems.slice(0), action.payload);

            return {
                ...state,
                searchQuery: action.payload,
                items: newItems
            };

        default:
            return state;
    }
};

export default albumReducer;
