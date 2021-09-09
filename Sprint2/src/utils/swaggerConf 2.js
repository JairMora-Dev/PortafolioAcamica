const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sprint project 2 - Delilah Restó",
            version: "2.0.0",
            description: "Proyecto 2 para acamica DWBE Persiste",
            contact : {
                name : " Jair Agudelo Mora ",
                email : "jairmora07@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Servidor para documentar API"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ["./src/routes/*.js"]

};

module.exports = swaggerOptions;