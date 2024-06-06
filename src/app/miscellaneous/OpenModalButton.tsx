// OpenModalButton.tsx

"use client"

import React from 'react';

interface OpenModalButtonProps {
  label?: string;
  onClick: () => void;
}

const OpenModalButton: React.FC<OpenModalButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick}>{label}</button>
  );
};

export default OpenModalButton;
