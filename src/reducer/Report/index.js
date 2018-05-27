export const REPORT_CITIES_REQUESTED = 'report/REPORT_CITIES_REQUESTED';
export const REPORT_CITIES = 'report/REPORT_CITIES';
export const REPORT_CITY_REQUESTED = 'report/REPORT_CITY_REQUESTED';
export const REPORT_CITY = 'report/REPORT_CITY';

const initialState = {
    cities: [],
    city: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REPORT_CITIES_REQUESTED:
            return {
                ...state
            };

        case REPORT_CITIES:
            return {
                ...state,
                cities: action.data
            };

        case REPORT_CITY_REQUESTED:
            return {
                ...state
            };

        case REPORT_CITY:
            return {
                ...state,
                city: action.data
            };

        default:
            return state;
    }
};

export const getReports = () => {
    return dispatch => {
        dispatch({type: REPORT_CITIES_REQUESTED});

        return fetch('data/cities-report.json')
            .then(r => r.json())
            .then(res => {
                dispatch({
                    type: REPORT_CITIES,
                    data: res.payload
                })
            });
    }
};

export const getReport = citiId => {
    return dispatch => {
        dispatch({type: REPORT_CITY_REQUESTED});

        return fetch('../data/cities-report.1.json')
            .then(r => r.json())
            .then(res => {
                dispatch({
                    type: REPORT_CITY,
                    data: res.payload
                })
            });
    }
};
