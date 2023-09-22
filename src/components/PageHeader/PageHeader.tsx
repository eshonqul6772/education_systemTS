import React from 'react';


import Breadcrumb, { IProps as IBreadcrumb } from 'components/Breadcrumb';

import cls from './PageHeader.module.scss';

interface IProps {
  title: string;
  buttons?: React.ReactNode[];
  mobileButtons?: React.ReactNode[];
  breadcrumb?: IBreadcrumb;
  onBack?: () => void;
}

const PageHeader: React.FC<IProps> = ({ title, buttons, mobileButtons, breadcrumb, onBack }) => (
  <div className={cls.wrapper}>
    {!!breadcrumb && (
      <div className={cls.breadcrumb}>
        <Breadcrumb {...breadcrumb} />
      </div>
    )}
    <div className={cls.content}>
      <div className={cls.left}>
        {!!onBack && (
          <div className={cls.back} onClick={onBack}>
          </div>
        )}
        <div className={cls.title}>{title}</div>
      </div>
    </div>
  </div>
);

export default PageHeader;
