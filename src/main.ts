import { BadRequestException, HttpException, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionHandler } from './utils/globalErrorHandler/globalErrorHandler.error';
import { ValidationException } from './utils/globalErrorHandler/validation.error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Cors
  app.enableCors({origin: process.env.ORIGIN});


  //Swagger
  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new ValidationException(validationErrors.map((error: ValidationError) => Object.values(error.constraints)[0]));
      },
    })
  );

  //Global Filters
  app.useGlobalFilters(new GlobalExceptionHandler());
  await app.listen(process.env.PORT);

  //Global Guards
}
bootstrap();
