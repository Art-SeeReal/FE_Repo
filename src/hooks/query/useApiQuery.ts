import { UseQueryResult, useQuery } from '@tanstack/react-query';
import xmlJs from 'xml-js';
import { getShowLists } from '../../api/api';

const QUERY_KEY = {
  kopis: 'kopis',
} as const;

export const useFetchShowLists = (): UseQueryResult => {
  return useQuery({
    queryKey: [QUERY_KEY.kopis],
    queryFn: () => getShowLists(),
    select: (data) => {
      const jsonData = xmlJs.xml2json(data.data, { compact: true, spaces: 2 });
      console.log(jsonData);
      //   const parsedData = JSON.parse(jsonData);
      //   return parsedData;
    },
  });
};
