const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sprint project 3 - Delilah Restó",
            version: "3.0.0",
            description: "Proyecto 3 para acamica DWBE My APP Live",
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