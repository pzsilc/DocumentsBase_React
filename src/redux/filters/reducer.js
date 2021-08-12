import types from './types';

const initState = {
    filters: {
        min_date: '',
        max_date: '',
        status: '',
        reason: '',
        search: '',
        page: 1
    }
}

const filtersReducer = (state = initState, action) => {
    switch(action.type){
        case types.ON_CHANGE: {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.name]: action.value
                }
            }
        }
        case types.RESET: {
            return {
                ...state,
                filters: initState.filters
            }
        }
        default:
            return state
    }
}

export default filtersReducer;