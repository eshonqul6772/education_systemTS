import React, { cloneElement } from 'react';
import cx from 'classnames';

import classes from './Button.module.scss';

type TSize = 'sm' | 'md' | 'lg';

type TVariant = 'primary' | 'success' | 'danger' | 'danger-delete' | 'secondary' | 'neutral';

interface IProps {
    className?: string;
    title?: string;
    prefixIcon?: React.ReactNode;
    suffixIcon?: React.ReactNode;
    size?: TSize;
    variant?: TVariant;
    type?: 'button' | 'submit';
    block?: boolean;
    disabled?: boolean;
    onClick?:any;
}

const Button: React.FC<IProps> = ({
                                      className,
                                      title = '',
                                      prefixIcon,
                                      suffixIcon,
                                      size = 'md',
                                      block,
                                      variant = '',
                                      type = 'button',
                                      disabled,
                                      onClick
                                  }) => {
    const resultProps = {
        className: cx(
            className,
            classes.wrapper,
            classes[`wrapper--size-${size}`],
            classes[`wrapper--variant-${variant}`],
            block && classes['wrapper--block'],
        ),
        onClick,
        disabled
    };

    const children = (
        <div className={classes.content}>
            {!!prefixIcon && <div className={cx(classes.icon, classes.prefixIcon)}>{prefixIcon}</div>}
            {!!title && <div className={classes.title}>{title}</div>}
            {!!suffixIcon && <div className={cx(classes.icon, classes.suffixIcon)}>{suffixIcon}</div>}
        </div>
    )

    return cloneElement(<button type={type}/>, resultProps, children);
};

export default Button;
