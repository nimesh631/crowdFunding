import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('crowdfunding example')
  .setDescription("crowd funding api description")
  .setVersion('1.0')
  .addTag('crowdfunding')
  .addBearerAuth()
  .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('',app,documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
