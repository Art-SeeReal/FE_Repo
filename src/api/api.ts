import kopis from '../utils/kopis';

export const getShowLists = () => {
  return kopis({
    url: 'openApi/restful/pblprfr?service=885acada0cb24a71b5113423d66b04c2&stdate=20220401&eddate=20240401&cpage=1&rows=200&prfstate=1',
    method: 'get',
  });
};
