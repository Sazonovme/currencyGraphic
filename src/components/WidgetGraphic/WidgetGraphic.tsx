import { useMemo, useState } from 'react';
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
import { CURRENCY_LABEL, Currency } from './constants';
import { useFetchDataGraphic } from './useFetchDataGraphic';

export function WidgetGraphic() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(
    Currency.dollar
  );
  const { loading, data, error } = useFetchDataGraphic();

  const option = useMemo(() => {
    if (error || loading) return null;

    const mockDataFilteredByCurrency = data.filter(
      (value) => value.indicator === CURRENCY_LABEL[currentCurrency]
    );
    const xData = mockDataFilteredByCurrency.map(({ month }) => month);
    const yData = mockDataFilteredByCurrency.map(({ value }) => value);
    const yDataSorted = yData.concat().sort((a, b) => a - b);

    return {
      xAxis: {
        type: 'category',
        data: xData,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisPointer: {
          label: {
            fontWeight: 'bold',
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
        interval: (yDataSorted[yDataSorted.length - 1] - yDataSorted[0]) / 4,
        min: ({ min }: { min: number }) => min,
        max: ({ max }: { max: number }) => max,
      },
      series: [
        {
          data: yData,
          type: 'line',
          smooth: 0.1,
          symbol: 'none',
          color: 'rgba(243, 139, 0, 1)',
          name: CURRENCY_LABEL[currentCurrency],
          lineStyle: {
            color: 'rgba(243, 139, 0, 1)',
            width: 2,
          },
        },
      ],
      tooltip: {
        show: true,
        trigger: 'axis',
        valueFormatter: (value: string) => value + currentCurrency,
      },
    };
  }, [currentCurrency, data, error, loading]);

  if (error) return null;
  return loading ? (
    <div>Loading...</div>
  ) : (
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
        <ReactECharts
          option={option}
          style={{ left: -70, top: -20, width: '95%' }}
        />
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
