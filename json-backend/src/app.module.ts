import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JsonReaderModule } from './json-reader/json-reader.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JsonReaderModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
