module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  websockets: true,
  app: {
    keys: ['1f5c4e6a8d5a8bcd6f7e4a3b2c1d8e6f', 'a9b8c7d6e5f4a3b2c1d8f7e6a5b4c3d2'],
  },
});
