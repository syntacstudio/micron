module.exports = {
  apps : [{
    name: 'micron',
    script: './bin/main.js',
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch : ['histories'],
    max_memory_restart: '1G',
    env: {
      'NODE_ENV': 'production',
    },
  }]
};
