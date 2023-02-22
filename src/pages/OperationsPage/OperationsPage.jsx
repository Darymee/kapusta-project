import operationTypes from 'constants/operationTypes';

import OperationsBalanceContainer from 'components/OperationsBalanceContainer/OperationsBalanceContainer';
import OperationsBalanceModal from 'components/OperationsBalanceModal/OperationsBalanceModal';
import OperationsContainer from 'components/OperationsContainer/OperationsContainer';
import OperationsTypeSwitcher from 'components/OperationsTypeSwitcher/OperationsTypeSwitcher';

import { Background } from 'components/UI/Background/Background';
import OperationsPageWrapper from './OperationsPages.styled';
import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { getSummary } from 'redux/transaction/operations';
// import { refreshUser } from 'redux/auth/operations';

const OperationsPage = () => {
  const [type, setType] = useState(operationTypes.expenses);
  const [balance, setBalance] = useState(null);
  const addBalance = xxx => setBalance(xxx);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(refreshUser());
  //   dispatch(getSummary(type));
  // }, [dispatch, type]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Background />

      <OperationsPageWrapper>
        <OperationsBalanceContainer addBalance={addBalance} />
        {!balance && <OperationsBalanceModal />}
        <OperationsTypeSwitcher type={type} setType={setType} />
        <OperationsContainer />
      </OperationsPageWrapper>
    </div>
  );
};

export default OperationsPage;
