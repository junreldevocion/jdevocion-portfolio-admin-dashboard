'use client';

import React from 'react';
import { TfiClose } from 'react-icons/tfi';
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalRoot = ({ children, isOpen, onClose }: ModalProps) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-400/60 backdrop-blur-sm z-50 cursor-pointer" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md cursor-default" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

interface ModalHeaderProps {
  title?: string;
  onClose: () => void;
}

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className='flex items-center justify-between'>
      <h1>{title}</h1>
      <button className='cursor-pointer' onClick={onClose}><TfiClose size={12} /></button>
    </div>
  );
};

interface ModalBodyProps {
  children: React.ReactNode
  className?: ClassNameValue
}

const ModalBody = ({ children, className }: ModalBodyProps) => {
  return <div className={twMerge(className)}> {children}</div>;
};

export const Modal = Object.assign(ModalRoot, {
  header: ModalHeader,
  body: ModalBody
});
