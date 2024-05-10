import { DocumentBuilder, SwaggerDocumentOptions, SwaggerCustomOptions } from '@nestjs/swagger';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';

export const documentConfig = new DocumentBuilder()
    .setTitle('API example')
    .setDescription('API description')
    .addServer('http://localhost:8080', 'Server dev')
    .addServer('http://localhost:3000', 'Server live')
    .build();

export const documentOptions: SwaggerDocumentOptions = {};

/**
 * swaggerOptions can be found here: https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md#display
 */
const swaggerOptions: SwaggerUiOptions = {
    docExpansion: "none", // collapse all tags
    defaultModelExpandDepth: 4, // expand lvl 4 (request, response schema is expanded)
    defaultModelsExpandDepth: 4,
    tagsSorter: 'alpha',
    operationsSorter: 'alpha',
};

export const setupOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Nest Example API',
    swaggerOptions
}