module.exports = {
    apps : [
        {
            name: "prelist",
            script: "app.js",
            env_development: {
                NODE_ENV: "development",
            },
            env_production : {
                NODE_ENV: "production",
            },
        },
    ],
};
