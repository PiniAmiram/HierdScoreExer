import { Controller, Get } from '@nestjs/common';
import { JsonReaderService } from './json-reader.service';

@Controller('json-reader')
export class JsonReaderController {
  constructor(private readonly jsonReaderService: JsonReaderService) {}

  @Get()
  getJson(): Promise<any> {
    return this.jsonReaderService.getJsonData();
  }
}
