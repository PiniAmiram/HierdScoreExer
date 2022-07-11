import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JsonReaderService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getJsonData(): Promise<any> {
    try {
      const url = this.configService.get('JSON_API_URL');
      const res = await this.httpService.axiosRef.get(url);
      const data = JSON.stringify(res.data);
      return JSON.parse(data);
    } catch (e) {
      const error = 'Failed to get json data: ' + (e.message || e);
      console.log(error);
    }
  }
}
