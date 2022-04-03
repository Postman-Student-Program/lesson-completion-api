/** pm2 config */
module.exports = {
  apps: [
    {
      name: 'lesson-completion-api',
      script: 'npm',
      automation: false,
      args: 'run start',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
