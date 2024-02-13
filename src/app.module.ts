import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './guards/auth.guard'
import { AuthModule } from './modules/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/modules/users/users.entity'
import { PagesModule } from './modules/pages/pages.module'
import { Page } from './modules/pages/pages.entity'
import { ComponentsModule } from './modules/components/components.module'
import { Component } from './modules/components/components.entity'

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: process.env['MYSQL_ROOT_PASSWORD'],
      database: 'website_maker',
      entities: [User, Page, Component],
      synchronize: false,
    }),
    PagesModule,
    ComponentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
