import React from 'react';

const ErrorMessage: React.FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <span className={`error text-danger font-sm ${className || ''}`}>
      {children}
    </span>
  );
};

export default ErrorMessage;
