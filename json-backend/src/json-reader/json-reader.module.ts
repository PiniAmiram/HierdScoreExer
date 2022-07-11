import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { JsonReaderController } from './json-reader.controller';
import { JsonReaderService } from './json-reader.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JsonReaderModule, HttpModule, ConfigModule],
  controllers: [JsonReaderController],
  providers: [JsonReaderService],
})
export class JsonReaderModule {}
