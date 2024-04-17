import { UseQueryResult, useQuery } from '@tanstack/react-query';
import convert from 'xml-js';
import { getShowLists } from '../../api/api';

const QUERY_KEY = {
  kopis: 'kopis',
} as const;

interface ResponseData {
  dbs: {
    db: {
      fcltynm: {
        _text: string;
      };
      genrenm: {
        _text: string;
      };
      mt20id: {
        _text: string;
      };
      openrun: {
        _text: string;
      };
      poster?: {
        _text?: string;
      };
      prfnm: {
        _text: string;
      };
      prfpdfrom: {
        _text: string;
      };
      prfpdto: {
        _text: string;
      };
      prfstate: {
        _text: string;
      };
      area: {
        _text: string;
      };
    }[];
  };
}

export const useFetchShowLists = (): UseQueryResult<ResponseData> => {
  return useQuery({
    queryKey: [QUERY_KEY.kopis],
    queryFn: () => getShowLists(),
    select: (data) => {
      const jsonData = convert.xml2json(data.data, { compact: true, spaces: 4 });
      const parsedData = JSON.parse(jsonData);
      return parsedData;
    },
  });
};
