// AppButton.tsx

"use client"

import React from 'react';

interface AppButtonProps {
  label: string;
  onClick: () => void;
}

const AppButton: React.FC<AppButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
};

export default AppButton;
