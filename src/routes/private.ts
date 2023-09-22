import * as Private from 'pages/private'

export default [
  {
    path: '/dashboard',
    accessRoles: ['ADMIN', 'STUDENT', 'TEACHER'],
    Page: Private.Dashbaord,
    hidden:false
  },

  {
    path: '/group',
    accessRoles: ['ADMIN'],
    Page: Private.Group,
    hidden:false
  },

  {
    path: '/group/create',
    accessRoles: ['ADMIN'],
    Page: Private.CreateGroup,
    hidden:false
  },

  {
    path: '/group/:id',
    accessRoles: ['ADMIN'],
    Page: Private.EditGroup,
    hidden:false
  },

  {
    path: '/teacher',
    accessRoles: ['ADMIN'],
    Page: Private.Teacher,
    hidden:false
  },

  {
    path: '/teacher/create',
    accessRoles: ['ADMIN'],
    Page: Private.CreatTeacher,
    hidden:false
  },

  {
    path: '/teacher/:id',
    accessRoles: ['ADMIN'],
    Page: Private.UpdateTeacher,
    hidden:false
  },

  {
    path: '/user',
    accessRoles: ['ADMIN', 'STUDENT'],
    Page: Private.User,
    hidden:false
  },

  {
    path: '/user/:id',
    accessRoles: ['ADMIN'],
    Page: Private.EditUser,
    hidden:false
  },

  {
    path: '/student',
    accessRoles: ['ADMIN'],
    Page: Private.Student,
    hidden:false
  },

  {
    path: '/student/create',
    accessRoles: ['ADMIN'],
    Page: Private.CreateStudent,
    hidden:false
  },

  {
    path: '/student/:id',
    accessRoles: ['ADMIN'],
    Page: Private.EditStudent,
    hidden:false
  },

  {
    path: '/subject',
    accessRoles: ['ADMIN'],
    Page: Private.Subject,
    hidden:false
  },

  {
    path: '/subject/create',
    accessRoles: ['ADMIN'],
    Page: Private.CreateSubject,
    hidden:false
  },

  {
    path: '/subject/:id',
    accessRoles: ['ADMIN'],
    Page: Private.EditSubject,
    hidden:false
  },

  {
    path: '/resources',
    accessRoles: ['ADMIN'],
    Page: Private.Resources,
    hidden:false
  },

  {
    path: '/resourcesList',
    accessRoles: ['ADMIN'],
    Page: Private.ResourcesList,
    hidden:false
  },

  {
    path: '/resourcesList/fizz',
    accessRoles: ['ADMIN'],
    Page: Private.Physics,
    hidden:false
  },


  {
    path: '/resources/upload',
    accessRoles: ['ADMIN'],
    Page: Private.UploadResources,
    hidden:false
  },

  {
    path: '/resources/:hashId',
    accessRoles: ['ADMIN'],
    Page: Private.viewResources,
    hidden:false
  },
]
