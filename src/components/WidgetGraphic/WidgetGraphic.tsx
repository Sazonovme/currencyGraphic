import { useState } from 'react';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import { ReactECharts } from '../../libs/Echarts/ReactECharts';
import {
  GraphicStyled,
  HeaderStyled,
  MainStyled,
  NameCurrencyStyled,
  NumCurrencyStyled,
  TypographyH3Styled,
  TypographyPStyled,
  WrapperStyled,
} from './WidgetGraphic.styles';
import { Currency } from './constants';

const option = {
  xAxis: {
    type: 'category',
    data: ['сен', 'окт', 'нояб', 'дек', 'янв'],
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisPointer: {
      label: {
        formatter: ({ value }: { value: string }) => value + ' год',
      },
    },
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
      },
    },
    min: ({ min }: { min: number }) => min,
    max: ({ max }: { max: number }) => max,
  },
  series: [
    {
      data: ['5', '10', '2', '7', '15'],
      type: 'line',
      smooth: 0.1,
      symbol: 'none',
      color: 'rgba(243, 139, 0, 1)',
      name: 'graphic',
      lineStyle: {
        color: 'rgba(243, 139, 0, 1)',
        width: 2,
      },
    },
  ],
  tooltip: {
    show: true,
    trigger: 'axis',
    valueFormatter: (value: string) => value + ' руб',
  },
};

export function WidgetGraphic() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(
    Currency.dollar
  );
  return (
    <GraphicStyled>
      <HeaderStyled>
        <TypographyH3Styled>КУРС ДОЛЛАРА, $/₽</TypographyH3Styled>
        <ChoiceGroup
          name="ChoiceGroup"
          size="s"
          items={Object.values(Currency)}
          value={currentCurrency}
          getItemLabel={(item: Currency) => item}
          onChange={({ value }) => {
            setCurrentCurrency(value as Currency);
          }}
        />
      </HeaderStyled>
      <MainStyled>
        <ReactECharts option={option} />
        <WrapperStyled>
          <TypographyPStyled>Среднее за период</TypographyPStyled>
          <NumCurrencyStyled>
            26, 2<NameCurrencyStyled> руб</NameCurrencyStyled>
          </NumCurrencyStyled>
        </WrapperStyled>
      </MainStyled>
    </GraphicStyled>
  );
}
