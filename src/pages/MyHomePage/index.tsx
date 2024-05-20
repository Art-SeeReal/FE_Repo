import React, { useEffect, useState } from 'react';
import Tabs from '../../components/Tabs';
import Home from './Home';
import * as S from '../../components/styles';
import Info from './InfoTab';
import Like from './Like';
import Scrap from './Scrap';
import Portfolio from './Portfolio';
import ApplyStatus from './ApplyStatus';
import { useFetchUserInfo } from '../../hooks/query/useUserQuery';
import { UserTypeAuthor, UserTypePlanner } from '../../utils/constants';

const MyHomePage = () => {
  const [userType, setUserType] = useState(UserTypeAuthor);
  const { data: userInfo, isSuccess } = useFetchUserInfo();

  const authorTitles = ['홈', '게시물', '지원내역', '좋아요', '스크랩', '내정보'];
  const authorContents = [<Home />, <Portfolio />, <ApplyStatus userType={userType} />, <Like />, <Scrap />, <Info />];
  const plannerTitles = ['홈', '게시물', '지원내역', '좋아요', '내정보'];
  const plannerContents = [<Home />, <Portfolio />, <ApplyStatus userType={userType} />, <Like />, <Info />];

  useEffect(() => {
    if (isSuccess) {
      setUserType(userInfo?.code);
    }
  }, [isSuccess, userInfo]);

  return (
    <S.Container>
      {userType === UserTypeAuthor && <Tabs tabTitles={authorTitles} tabContents={authorContents} $divider />}
      {userType === UserTypePlanner && <Tabs tabTitles={plannerTitles} tabContents={plannerContents} $divider />}
    </S.Container>
  );
};

export default MyHomePage;
