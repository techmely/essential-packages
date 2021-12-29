import * as React from 'react';

export function Logo() {
  return (
    <img
      style={{ cursor: 'pointer' }}
      onClick={() => console.log('run')}
      src="/logo.svg"
      alt="ican logo"
    />
  );
}
