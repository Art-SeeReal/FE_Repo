import kopis from '../utils/kopis';

export const getShowLists = () => {
  return kopis({
    url: 'openApi/restful/pblprfr?service=885acada0cb24a71b5113423d66b04c2&stdate=20160601&eddate=20160630&cpage=1&rows=5',
    method: 'get',
  });
};
