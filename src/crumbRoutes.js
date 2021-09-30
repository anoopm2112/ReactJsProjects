import { PATH } from './routes';

export const getBreadCrumbRoutes = () => ({
    [PATH.DASHBOARD]: {
        label: 'dashboard'
    },
    [PATH.USER]: {
        label: 'users'
    },
    [`${PATH.USER}/create`]: {
        label: 'create'
    },
    [`${PATH.USER}/:id/details`]: {
        label: 'details'
    },
    [`${PATH.USER}/:id/addContact`]: {
        label: 'contact'
    },
    [`${PATH.USER}/:id/addPassword`]: {
        label: 'password'
    },
    [`${PATH.USER}/:id/updateAddress`]: {
        label: 'address'
    }
});
