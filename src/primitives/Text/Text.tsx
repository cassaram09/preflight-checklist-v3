import React from 'react';

export type TextProps = {
  readonly children?: React.ReactNode;
  readonly component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  readonly className?: string;
  readonly variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'body4'
    | 'body5'
    | 'body6';
  readonly text?: string | number | null;
  readonly fontFamily?: 'libreBaskerville' | 'menoBanner' | 'behaviorline';
  readonly weight?: 'regular' | 'bold';
};

export default function Text({
  children,
  component = 'span',
  variant = 'body1',
  className,
  text = '',
  fontFamily,
}: TextProps): JSX.Element {
  const classes = ['text', variant, fontFamily, className].filter((c) => !!c).join(' ');

  const content = () => {
    if (children) {
      return children;
    }

    return text;
  };

  return React.createElement(
    component,
    {
      className: classes,
      type: component,
    },
    content(),
  );
}
