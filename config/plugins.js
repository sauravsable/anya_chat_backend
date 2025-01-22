module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', 'qf4TV4qZT0kPvLfghyq5Yg=='),
    },
  },
});
