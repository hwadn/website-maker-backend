import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from 'src/interceptors/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({ methods: '*' })

  const config = new DocumentBuilder()
    .setTitle('API Document')
    .setDescription('The website maker API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-v1/swagger', app, document)

  app.setGlobalPrefix('api-v1')
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new TransformInterceptor())
  await app.listen(3000)
}
bootstrap()
