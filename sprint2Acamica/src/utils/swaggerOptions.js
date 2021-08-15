const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sprint project 1 - Delilah Resto",
            version: "1.0.0",
            description: "Proyecto 2 para acamica DWBE"
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local server"
            }
        ],
        components: {
            securitySchemes: {
                basicAuth: {
                    type: "http",
                    scheme: "basic"
                }
            }
        },
        security: [
            
        ]
    },
    apis: ["./src/routes/*.js"]
};

module.exports = swaggerOptions;
