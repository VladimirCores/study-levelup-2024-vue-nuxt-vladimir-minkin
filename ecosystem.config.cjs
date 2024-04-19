module.exports = {
  apps : [{
    name: 'levelup-vue-nuxt',
    script: 'serve',
    watch: 'dist',
    instances: '1',
    exec_mode : "fork",
    env: {
      PM2_SERVE_PATH: 'dist',
      PM2_SERVE_PORT: 8080,
      PM_SERVE_SPA: 'true'
    }
  }],
};
