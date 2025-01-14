export default {
  Base: '/api',
  Users: {
    Base: '/users',
    GetAll: '/',
    Get: '/:id',
    Me: '/me',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
  Accounts: {
    Base: '/accounts',
    GetAll: '/',
    Get: '/:id',
    Add: '/',
    Update: '/:id',
    Delete: '/:id',
  },
} as const;
