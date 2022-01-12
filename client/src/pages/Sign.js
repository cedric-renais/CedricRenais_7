import React from 'react';
import SignComponent from '../components/Sign';
function Sign() {
  return (
    <div>
      <SignComponent signin={true} signup={false} />
    </div>
  );
}

export default Sign;
