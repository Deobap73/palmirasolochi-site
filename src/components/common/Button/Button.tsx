// src/components/common/Button/Button.tsx
'use strict';

import React from 'react';
import './Button.scss';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type CommonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled' | 'title'> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'title'> & {
    href: string;
    target?: string;
    rel?: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button (BEM)
 * - Accessible, keyboard-friendly, and uses CSS variables.
 * - Renders <button> by default; <a> if `href` is provided.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  className,
  href,
  title,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    block ? 'btn--block' : '',
    isDisabled ? 'is-disabled' : '',
    loading ? 'is-loading' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {loading && <span className='btn__spinner' aria-hidden='true' />}
      {iconLeft && (
        <span className='btn__icon btn__icon--left' aria-hidden='true'>
          {iconLeft}
        </span>
      )}
      <span className='btn__label'>{children}</span>
      {iconRight && (
        <span className='btn__icon btn__icon--right' aria-hidden='true'>
          {iconRight}
        </span>
      )}
    </>
  );

  if (href) {
    const linkProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a
        {...linkProps}
        href={href}
        className={classes}
        aria-disabled={isDisabled ? true : undefined}
        tabIndex={isDisabled ? -1 : linkProps.tabIndex}
        title={title}
        onClick={(e) => {
          if (isDisabled) e.preventDefault();
          if (linkProps.onClick && !isDisabled) linkProps.onClick(e);
        }}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      {...buttonProps}
      type={buttonProps.type ?? 'button'}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      title={title}>
      {content}
    </button>
  );
};

export default Button;
