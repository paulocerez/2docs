import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "2docs API",
      version: "1.0.0",
      description: "2docs API reference",
    },
    servers: [
      {
        url: process.env.API_URL,
        description: "Development server",
      },
    ],
  },
  apis: ["./api/*.ts", "./api/**/*.ts"],
};

const spec = swaggerJsdoc(options);

export default spec;
