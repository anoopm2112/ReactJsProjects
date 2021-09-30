import React from 'react';
// import { store } from './redux/store';
import { Route } from 'react-router-dom';

// import { SubMenuAccessPermissions } from './utils/PermissionUtils';
// import { RESOURCE_MAPPING, ACTION_MAPPING } from './common/constants';
import { Icons, I18n } from '../src/common/components';

import CommonProfileView from './modules/user/components/CommonProfileView';
import DashboardView from './modules/dashboard/components/DashboardView';

const { DashboardTwoTone } = Icons;

export const PATH = {
    DASHBOARD: '/admin/index',
    PROFILE: '/admin/index/profile',
    USER: '/admin/index/user'
};

export const getMenuItems = () => {
    // let userDetails = store.getState();
    let menu = [];
    menu.push({
        name: I18n.t('dashboard'),
        Icon: <DashboardTwoTone />,
        link: PATH.DASHBOARD
    });
    return menu;
};

export const getExceptionalPaths = () => {
    // Paths Without Restrictions
    let expPaths = [];
    expPaths.push(
        <Route path={PATH.DASHBOARD} exact component={DashboardView} />,
        <Route path={`${PATH.PROFILE}`} exact component={CommonProfileView} />,
        <Route path={`${PATH.PROFILE}/details`} exact component={CommonProfileView} />,
        <Route path={`${PATH.PROFILE}/change_password`} exact component={CommonProfileView} />
    );
    return expPaths;
};

export const getRoutePaths = () => {
    // let userDetails = store.getState();
    let paths = [];
    return paths;
};
