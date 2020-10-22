const config = {
    database : {
        uri: process.env.MONGODB_URI
    },
    token: {
        secret: process.env.SECRET,
        access: {
            expiry: 60 * 60
        },
         refresh: {
             expiry: 60 * 60 * 24
         }
    },
    server : {
        port: process.env.PORT || 8000
    }
};

module.exports = config;