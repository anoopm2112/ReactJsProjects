import { types } from './actions';
import { DEFAULT_LANGUAGE } from './constants';
import { getPayloadData } from '../../utils/ApiUtils';
import _ from 'lodash';

const initialState = {
    defaultLanguage: DEFAULT_LANGUAGE,
    renderMenu: 0,
    allLanguages: {
        data: [],
        requestInProgress: false
    },
    setBreadCrump: {
        breadCrumpArray: []
    },
    currentBreadCrumb: {},
    tableProps: {}

};
const getFullFilterOption = (existing = {}, newFilterOptions = {}) => {
    let filterArray = [];
    let response = {};
    // let sameValueFlag = false;

    if (existing && Object.keys(existing).length > 0) {
        Object.keys(existing).map((item) => {
            let newFilterArray = _.get(newFilterOptions, item, null);
            if (newFilterArray) {
                existing[item]?.map((existingItem) => {
                    filterArray = newFilterArray?.map((newFilterItem) => {
                        if (existingItem?.id === newFilterItem?.id) {
                            // sameValueFlag = true;
                        }
                        return { id: newFilterItem?.id, name: newFilterItem?.name };
                    });
                });
                // if (!sameValueFlag) {
                existing[item] = [...existing[item], ...filterArray];
                // response[item] = [...existing[item]];
                // }
                existing[item] = [...new Map(existing[item].map(items => [items?.id, items])).values()];
            }

        });
        response = { ...response, ...existing };
        return response;
    } else {
        response = { ...newFilterOptions };
        return response;

    }
};


const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'persist/REHYDRATE':
            return Object.assign({}, state, {
                renderMenu: Math.random()
            });

        case types.SET_BREAD_CRUMB_WITH_PATH:
            return Object.assign({}, state, {
                setBreadCrump: {
                    ...state.setBreadCrump,
                    breadCrumpArray: action.payload.data || []
                }
            });
        case types.GET_ALL_LANGUAGES_REQUEST:
            return Object.assign({}, state, {
                allLanguages: {
                    ...initialState.allLanguages,
                    requestInProgress: true
                }
            });
        case types.GET_ALL_LANGUAGES_SUCCESS:
            return Object.assign({}, state, {
                allLanguages: {
                    data: getPayloadData(action.payload, []),
                    requestInProgress: false
                }
            });
        case types.GET_ALL_LANGUAGES_FAILED:
            return Object.assign({}, state, {
                allLanguages: {
                    ...initialState.allLanguages,
                    requestInProgress: false
                }
            });
        case types.CHANGE_LANGUAGE:
            return Object.assign({}, state, {
                defaultLanguage: action.payload.lang
            });
        case types.SET_TABLE_PAGINATION: {
            let { key, pagination } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        pagination: {
                            ..._.get(state, `tableProps.${key}.pagination`, {}),
                            ...pagination
                        }
                    }
                }
            });
        }
        case types.SET_TABLE_FILTER_CHIPS: {
            let { key, chips } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ...state.tableProps[key] || {},
                        chips
                    }
                }
            });
        }
        case types.SET_ADDITIONAL_TABLE_FILTERS: {
            let { key, additionalFilters } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ...state.tableProps[key] || {},
                        additionalFilters
                    }
                }
            });
        }
        case types.SET_TABLE_FILTER_OPTIONS_LIST: {
            let { key, filterOptionsList } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        filterOptions: getFullFilterOption(_.get(state, `tableProps.${key}.filterOptions`, {}), filterOptionsList)

                    }
                }
            });
        }

        case types.RESET_TABLE_FILTER_OPTIONS_LIST: {
            let { key } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        filterOptions: {}
                    }
                }
            });
        }

        case types.RESET_FILTER_BASED_ON_KEY: {
            let { key } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        filterState: {
                        }
                    }
                }
            });
        }

        case types.SET_TABLE_SELECTED_IDS: {
            let { key, selectedIds = [] } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        selectedIds
                    }
                }
            });
        }
        case types.SET_TABLE_FILTER_STATE: {
            let { key, filterState } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        filterState: {
                            ..._.get(state, `tableProps.${key}.filterState`, {}),
                            ...filterState
                        }
                    }
                }
            });
        }

        case types.SET_PASSED_COLUMNS: {
            let { key, passedColumns = [] } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        passedColumns
                    }
                }
            });
        }

        case types.SET_FILTERS_TO_INITIAL_DROPDOWN_LIST: {
            let { key, initialfilterOptions } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        initialfilterOptions: initialfilterOptions
                    }
                }
            });
        }
        case types.SET_FILTER_VALUES_FROM_INITIAL_STATE: {
            let { key } = action.payload.data;
            return Object.assign({}, state, {
                tableProps: {
                    ...state.tableProps,
                    [key]: {
                        ..._.get(state, `tableProps.${key}`, {}),
                        filterOptions: _.get(state, `tableProps.${key}.initialfilterOptions`, {})
                    }
                }
            });
        }

        default:
            return state;
    }
};

export default commonReducer;
