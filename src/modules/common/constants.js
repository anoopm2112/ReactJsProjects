import { I18n } from '../../common/components';

export const STATE_REDUCER_KEY = 'common';

export const SetDefaultLanguageID = (language) => {
    switch (language) {
        case 'en-IN':
            return 1;
        case 'ml-IN':
            return 2;
        case 'mr-IN':
            return 3;
        default:
            return 1;
    }
};

export const DEFAULT_LANGUAGE = { id: SetDefaultLanguageID(I18n.language), locale: I18n.language };

export const PICKY_EMPTY = { id: null, name: 'drop_down_select' };

export const MESSAGE_TYPES = {
    ERROR: 'error',
    INFO: 'info',
    WARNING: 'warning',
    SUCCESS: 'success'
};


