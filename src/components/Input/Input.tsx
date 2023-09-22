import React, { useState } from 'react'
import cx from 'classnames'

import classes from './Input.module.scss'

interface IInput {
  value?: string;
  defaultValue?: string;
  className?: string;
  name?: string;
  id?: string;
  type?: string;
  state?: string;
  placeholder?: string;
  autoFocus?: () => void;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
  message?: string | any;
  label?: string | null;
}

const Input: React.FC<IInput> = ({
  label = '',
  value = '',
  className = '',
  defaultValue = '',
  id = '',
  name = '',
  type = 'text',
  state = 'default', // 'default' | 'success' | 'error'
  placeholder = '',
  message = '',
  onChange,
  onBlur,
}) => {
  const [isFocused, setFocused] = useState(false)

  return (
    <>
      <div style={{display:'flex', flexDirection:'column'}}>
        <label className={cx(classes['input-label'])}>{label}</label>
        <input
          className={cx(
            className,
            classes.input,
            state && classes[`input--state-${state}`],
            isFocused && classes['input--focused'],
          )}
          {...{ value, type, id, name, placeholder, defaultValue }}
          onChange={(e) => onChange && onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false)
            onBlur && onBlur(e.target.value)
          }}
          autoComplete='off'
        />
      </div>

      {!!message && <div className={classes.message}>{message}</div>}
    </>
  )
}

export default Input
