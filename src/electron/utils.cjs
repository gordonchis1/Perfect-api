function isDev() {
    return process.env.NODE_ENV == 'development'
}


exports.isDev = isDev
