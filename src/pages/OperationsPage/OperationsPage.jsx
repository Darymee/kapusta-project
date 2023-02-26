// import OPERATION_TYPE from 'constants/constants';
import { motion } from 'framer-motion';
import OperationsBalanceContainer from 'components/OperationsBalanceContainer/OperationsBalanceContainer';
import OperationsBalanceModal from 'components/OperationsBalanceModal/OperationsBalanceModal';
import OperationsContainer from 'components/OperationsContainer/OperationsContainer';
import OperationsTypeSwitcher from 'components/OperationsTypeSwitcher/OperationsTypeSwitcher';

import { Background } from 'components/UI/Background/Background';
import { CongratulationsModal } from 'components/CongratulationsModal/CongratulationsModal';
import OperationsPageWrapper from './OperationsPages.styled';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSummary,
  getTransactionsByOperation,
} from 'redux/transaction/operations';
import { selectBalance, selectFirstVisit } from 'redux/auth/selectors';
import { selectOperationType } from 'redux/transaction/selectors';

const OperationsPage = () => {
  let firstVisit = useSelector(selectFirstVisit);
  const balance = useSelector(selectBalance);
  const [constants, setConstants] = useState(0);
  const skelet = useSelector((state) => state.transactions.skelet);

  const handleChange = value => {
    setConstants(prevState => (prevState += 1));
  };

  const operationType = useSelector(selectOperationType);

  const dispatch = useDispatch();
  
  useEffect(() => {
    // dispatch(setOperationType(type));
    dispatch(getSummary({ operation: operationType }));
    dispatch(getTransactionsByOperation({ operation: operationType }));
  }, [dispatch, operationType]);

  return (
    <>
      {!firstVisit && <CongratulationsModal />}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Background />
        {skelet ? <LoaderOperationPage /> : <OperationsPageWrapper>
          <OperationsBalanceContainer addBalance={0} />
          {!balance && <OperationsBalanceModal />}
           <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >         
          <OperationsTypeSwitcher onChange={handleChange} />
          <OperationsContainer value={constants} />
           </motion.div>         
        </OperationsPageWrapper>}

      </div>
    </>
  );
};

export default OperationsPage;
