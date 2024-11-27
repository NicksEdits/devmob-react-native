import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API documentation for Super Voisin')
    .setVersion('0.4')
    .addTag('users')
    .addTag('posts')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // Accessible via /api

  app.enableCors({ origin: 'http://localhost:8081' })
  await app.listen(3000)
}
bootstrap()
