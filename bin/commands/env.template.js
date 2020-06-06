'use strict'

const envTemplate = {
    ENV_KEY: '',
    SERVER_NAME: 'Micron',
    HOST: '0.0.0.0',
    PORT: '1945',
    AUTH: 'true',
    COOKIE_MAX_AGE: 31104000,
    GIT_SECRET_KEY: '',
    GITHUB_WEBHOOK_URL: '/deployer/webhook/github',
    GITHUB_BITBUCKET_URL: '/deployer/webhook/bitbucket',
    GITHUB_GITLAB_URL: '/deployer/webhook/gitlab'
}


module.exports = envTemplate