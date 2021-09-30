export const URL = {
    USER: {
        AUTHENTICATE: 'auth/realms/bhoomitra/protocol/openid-connect/token',
        FETCH_USER_INFO: 'user/profile',
        CHANGE_PASSWORD: 'user/profile/password',
        SENT_USER_INFO: 'user/users/:userId',
        LOGOUT: 'logout'
    },
    COMMON: {
        LOAD_LANGUAGES: 'admin/languages'
    },
    FORGOT_PASSWORD: {
        SENT_MOBILE_NUMBER_FOR_OTP: 'user/otp',
        OPT_VERIFY: 'user/otp/verify',
        RESET_PASSWORD: 'user/reset-password'
    }
};
