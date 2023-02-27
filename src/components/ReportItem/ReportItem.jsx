import { useEffect } from 'react';
import { PropTypes } from 'prop-types';

import Icons from 'images/icons-sprite.svg';

import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPeriod } from 'redux/reports/selectors';
import { getItemsCategoryReports } from 'redux/reports/operations';


import categoryName from 'helpers/categoryName';
import { useTranslation } from 'react-i18next';

import {
  ReportItemButton,
  Sum,
  Wrapper,
  ButtonReport,
  Type,
} from './ReportItem.styled';




export const ReportItem = ({ sum, category, type, setIsActive, isActive }) => {
  const sumToFixed = sum.toFixed(2);
  const dispatch = useDispatch();
  const currentPeriod = useSelector(selectCurrentPeriod);

  const handleClick = e => {
    setIsActive(e.currentTarget.dataset.set);
    dispatch(
      getItemsCategoryReports({
        ...currentPeriod,
        operation: type,
        category,
      })
    );
  };

  useEffect(() => {
    if (isActive === true) {
      dispatch(
        getItemsCategoryReports({
          ...currentPeriod,
          operation: type,
          category,
        })
      );
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, currentPeriod]);
  const { t } = useTranslation();
  const getIconKey = category => {
    if (category.toLowerCase() === 'communal, communication') {
      return 'communal';
    }
    if (category.toLowerCase() === 'sports, hobbies') {
      return 'sports';
    }
    return category.toLowerCase();
  };

  return (
    <ReportItemButton>
      <Sum>{sumToFixed}</Sum>
      <Wrapper>
        <ButtonReport
          data-set={category.toLowerCase()}
          onClick={e => handleClick(e)}
          isActive={isActive}
        >
          <svg width="60" height="60">
            <use href={`${Icons}#icon-${type}-${getIconKey(category)}`}></use>
          </svg>
          <div></div>
        </ButtonReport>
      </Wrapper>
      <Type>{t(categoryName(category))}</Type>
    </ReportItemButton>
  );
};

ReportItem.propTypes = {
  sum: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setIsActive: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};
