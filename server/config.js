const config = {
    database : {
        uri: "mongodb+srv://administrateur:ywa4wOF4PWGVxM40@cluster0-ds6hm.gcp.mongodb.net/auth?retryWrites=true&w=majority"
    },
    token: {
        secret: "gFu6_lpM30)ko2&ijUyHGvR5g784",
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