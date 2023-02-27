import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { Backdrop, Text, Title, Modal } from './OperationsBalanceModal.styled';

const body = document.querySelector('body');

const OperationsBalanceModal = () => {
  useEffect(() => {
    body.style.cssText = `overflow: hidden`;
  }, []);

  const { t } = useTranslation();
  return (
    <Backdrop>
      <Modal>
        <Title>{t('balanceModalTitle')}!</Title>
        <Text>{t('balanceModalText')} </Text>
      </Modal>
    </Backdrop>
  );
};
export default OperationsBalanceModal;
