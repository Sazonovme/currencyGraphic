import { mockData } from '../data/data';

export type GetDataReqDto = {
  date: string;
  month: string;
  indicator: string;
  value: number;
}[];

export const getData = async (): Promise<GetDataReqDto> => {
  // const response = await fetch('url', { method: 'GET' });
  // return response.json;
  return new Promise<GetDataReqDto>((resolve) => {
    setTimeout(() => resolve(mockData), 1000);
  });
};
