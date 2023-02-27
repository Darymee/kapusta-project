import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { setBalance } from 'redux/auth/operations';
import { selectBalance, selectFirstBalance } from 'redux/auth/selectors';

import {
  Form,
  Title,
  Input,
  Button,
  Wrapper,
  Label,
  InputContainer,
} from './Balance.styled';

const Balance = () => {
  const [value, setValue] = useState('');
  const currentBalance = useSelector(selectBalance);
  const firstBalance = useSelector(selectFirstBalance);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    setValue(currentBalance);
  }, [currentBalance]);

  const onSubmit = e => {
    e.preventDefault();
    dispatch(setBalance({ balance: e.target.elements.balance.value }));
  };

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <Wrapper>
      <Title> {t('Balance')}:</Title>
      <Form onSubmit={onSubmit}>
        <InputContainer>
          <Input
            type="number"
            readOnly={firstBalance}
            name="balance"
            // placeholder={`${currentBalance.toFixed(2)}`}
            pattern="[0-9, .UAH]*"
            value={value}
            onChange={onChange}
          />
          <Label>{t('UAH')} </Label>
        </InputContainer>
        {!firstBalance && <Button type="submit">{t('button.CONFIRM')}</Button>}
      </Form>
    </Wrapper>
  );
};

export default Balance;
