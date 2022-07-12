import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { JsonCandidiate, JsonExperience } from 'src/interface/json-candidiate.interface';
import { Candidiate, Experience } from 'src/interface/candidiate.interface';

@Injectable()
export class JsonReaderService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getJsonData(): Promise<{ candidiates: Candidiate[] }> {
    try {
      const url = this.configService.get('JSON_API_URL');
      const res = await this.httpService.axiosRef.get(url);

      return {
        candidiates: this.getTransformedCandidiates(res.data)
      };
    } catch (e) {
      const error = 'Failed to get json data: ' + (e.message || e);
      console.log(error);
      throw new Error(error);
    }
  }

  getTransformedCandidiates(candidiates: JsonCandidiate[] = []): Candidiate[] {
    return candidiates.map(({ contact_info, experience }: JsonCandidiate) => ({
      name: contact_info?.name?.given_name,
      experience: this.getTransformedExperience(experience)
    }));
  }

  getTransformedExperience(jsonExperience: JsonExperience[] = []): Experience[] {
    return jsonExperience
      .sort(this.sortExperienceByDate)
      .map(({ title, start_date, end_date }, index) => ({
        jobTitle: title,
        startDate: start_date,
        endDate: end_date,
        gap: index + 1 < jsonExperience.length ? this.getGapBetweenJobs( 
          new Date(jsonExperience[index + 1]?.end_date),
          new Date(start_date)
        ) : null
      }));
  }

  getGapBetweenJobs(previousJobEndDate: Date, nextJobStartDate: Date): string {
    const msDiff = this.getMsDiffBetweenDates(previousJobEndDate, nextJobStartDate);
    const daysDiff = this.getDaysSumByMS(msDiff);

    if (daysDiff > 365) {
      const yearsDiff = this.getYearsDiffBetweenDates(previousJobEndDate, nextJobStartDate);
      return `${yearsDiff} years`;
    }

    if (daysDiff > 31) {
      const monthsDiff = this.getMonthsDiffBetweenDates(previousJobEndDate, nextJobStartDate);
      return `${monthsDiff} months`;
    }

    return daysDiff > 1 ? `${daysDiff} days` : null;
  }

  sortExperienceByDate(a: JsonExperience, b: JsonExperience) {
    return new Date(b.start_date).getTime() - new Date(a.end_date).getTime();
  }

  getMsDiffBetweenDates(firstDate: Date, secondDate: Date) {
    return secondDate.getTime() - firstDate.getTime();
  }

  getDaysSumByMS(ms: number) {
    const MS_PER_DAY = 1000 * 3600 * 24;
    return ms / (MS_PER_DAY);
  }

  getMonthsDiffBetweenDates(firstDate: Date, secondDate: Date) {
    const firstDateYear = firstDate.getFullYear();
    const secondDateYear = secondDate.getFullYear();
    const firstDateMonth = firstDate.getMonth();
    const secondDateMonth = secondDate.getMonth();

    return (secondDateMonth + (secondDateYear * 12)) - (firstDateMonth + (firstDateYear * 12));
  }

  getYearsDiffBetweenDates(firstDate: Date, secondDate: Date) {
    return secondDate.getFullYear() - firstDate.getFullYear();
  }
}
