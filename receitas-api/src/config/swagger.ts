import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Receitas API',
    version: process.env.npm_package_version ?? '1.0.0',
    description: 'API para o desafio tecnico da a4pm.',
  },
  servers: [
    { url: process.env.APP_URL ?? 'http://localhost:3000', description: 'Local' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};

export const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: [
    'src/routes/**/*.ts',
    'src/app.ts',
  ],
});
