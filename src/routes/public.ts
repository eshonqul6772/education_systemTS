import * as Public from '../pages/public';

export default [
    {
        path: '/',
        Page: Public.Home
    },
    {
        path: '/staff',
        Page: Public.Staff
    },
    {
        path: '/admin',
        Page: Public.AdminLogin
    },
    {
        path: '/teacher',
        Page: Public.TeacherLogin
    },
    {
        path: '/studentlogin',
        Page: Public.StudentLogin
    },
    {
        path: '/support',
        Page: Public.Support
    }
];