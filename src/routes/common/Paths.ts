export default {
  Base: '/api',
  Users: {
    Base: '/users',
    GetAll: '/',
    Get: '/:id',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
} as const;
