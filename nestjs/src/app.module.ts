import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_ENGINE as any,
      host: process.env.DB_HOST as any,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USERNAME as any,
      password: process.env.DB_PASSWORD as any,
      database: process.env.DB_NAME as any,
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
