import React from 'react';
import { DimensionsInput } from './DimensionsInput';
import { OpeningInput } from './OpeningInput';

export const RoomLayoutInput: React.FC = () => {
  return (
    <div className="space-y-6">
      <DimensionsInput />
      <OpeningInput type="windows" />
      <OpeningInput type="doors" />
    </div>
  );
};