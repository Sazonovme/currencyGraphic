import { useEffect, useState } from 'react';
import api from '../../api';
import { GetDataReqDto } from '../../api/get-data';

export const useFetchDataGraphic = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<GetDataReqDto>([]);
  const [error, setError] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const resp = await api.getData.getData();
      setData(resp);
    } catch (e) {
      setError(true);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    loading,
    error,
    data,
  };
};
