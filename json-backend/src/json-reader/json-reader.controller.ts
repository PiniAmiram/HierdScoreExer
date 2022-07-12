import { Controller, Get } from '@nestjs/common';
import { Candidiate } from 'src/interface/candidiate.interface';
import { JsonReaderService } from './json-reader.service';

@Controller('json-reader')
export class JsonReaderController {
  constructor(private readonly jsonReaderService: JsonReaderService) {}

  @Get()
  getJson(): Promise<{ candidiates: Candidiate[] }> {
    return this.jsonReaderService.getJsonData();
  }
}
