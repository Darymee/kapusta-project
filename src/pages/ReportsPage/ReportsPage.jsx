import ReportsBalanceContainer from 'components/ReportsBalanceContainer/ReportsBalanceContainer';
import React from 'react';
import ReportsPageWrapper from './ReportsPage.styled';
importReportsMonthBalance from 'components/ReportsMonthBalance/ReportsMonthBalance';

const ReportsPage = () => {
  return (
    <ReportsPageWrapper>
      <ReportsMonthBalance />
      <ReportsBalanceContainer />
    </ReportsPageWrapper>
  );
};

export default ReportsPage;
