module.exports = {
  apps : [{
    name: 'deployer',
    script: './bin/main.js',
    instances: 1,
    autorestart: true,
    watch: true,
    ignore_watch : ['logs'],
    max_memory_restart: '1G',
  }]
};
