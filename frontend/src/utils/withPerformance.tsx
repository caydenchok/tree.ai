import React from 'react';

export function withPerformance<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  return React.memo(
    (props: P) => {
      return <WrappedComponent {...props} />;
    },
    (prevProps, nextProps) => {
      return Object.keys(prevProps).every(
        (key) => prevProps[key as keyof P] === nextProps[key as keyof P]
      );
    }
  );
}
