import { Body, Post, Get, Controller } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
  constructor(private forecastService: ForecastService) {}

  @Get('test')
  register(): any {
    return this.forecastService.test();
  }
  @Get('getAll')
  getAll(): any {
    return this.forecastService.getAll();
  }
  @Post('data')
  async getData(@Body() data: any) {
    return this.forecastService.getTargetData(data);
  }
  //옵션 선택지
  @Post('getOptions')
  async getOptions(@Body() data: any) {
    console.log(data);
    // 1. 모든 요소가 비어 있을 때
    if (!data.관리구분 && !data.품목 && !data.품종 && !data.등급) {
      return this.forecastService.handleEmpty();
    }

    // 2. 관리구분만 있고 나머지 요소가 비어 있을 때
    if (data.관리구분 && !data.품목 && !data.품종 && !data.등급) {
      return this.forecastService.handleOnlyManagement(data.관리구분);
    }

    // 3. 관리구분, 품목이 있고 품종, 등급이 비어 있을 때
    if (data.관리구분 && data.품목 && !data.품종 && !data.등급) {
      return this.forecastService.handleManagementAndItem(
        data.관리구분,
        data.품목,
      );
    }

    // 4. 등급만 없을 때
    if (data.관리구분 && data.품목 && data.품종 && !data.등급) {
      return this.forecastService.handleWithoutGrade(
        data.관리구분,
        data.품목,
        data.품종,
      );
    }

    //5. 모든 요소가 있을 때
    if (data.관리구분 && data.품목 && data.품종 && data.등급) {
      return this.forecastService.handleAll(
        data.관리구분,
        data.품목,
        data.품종,
        data.등급,
      );
    }
    // 기본적으로 정의되지 않은 조건에 대해 처리
    return { error: 'Invalid request data' };
  }

  @Get('test')
  async testing(): Promise<any> {
    const data = [
      {
        예측날짜: '2000-01-26',
        현재고: 1234,
        현재중량: 1234,
        재고상태: '0',
        중량상태: '0',
      },
      {
        예측날짜: '2000-01-26',
        현재고: 1234,
        현재중량: 1234,
        재고상태: '0',
        중량상태: '0',
      },
    ];
    return data;
  }
}
