'use client';

import { Button } from '@/src/components/Button';
import { useState } from 'react';
import { Modal } from '@/src/components/Modal';
import { StackForm } from './StackForm';
import { TechStackInput } from '@/src/lib/techstack/techstack.schema';
import { RenderListOfStacks } from './RenderListOfStacks';

interface TechStackProps {
  data: TechStackInput[] | undefined
}

export const TechStack: React.FC<TechStackProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stackToEdit, setStackToEdit] = useState<TechStackInput | null>(null);
  return (
    <>
      <Button size="md" variant="primary" className="mt-4" onClick={() => {
        setIsOpen(!isOpen);
        setStackToEdit(null); // Reset stackToEdit for new entry
      }}>
        Add technology
      </Button>
      <div className="mt-12">
        <table className="w-full mb-0 align-top border-collapse text-slate-500 mr-4">
          <thead className="text-left border-b border-indigo-100">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Created date</th>
              <th className="p-4">Created by</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              (data ?? []).map((stack) => (
                <RenderListOfStacks key={stack.id} stack={stack} onEdit={(item) => {
                  setStackToEdit(item);
                  setIsOpen(true);
                }} />
              ))
            }
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.header title={!stackToEdit ? 'Add technology' : 'Update technology'} onClose={() => setIsOpen(!isOpen)} />
        <Modal.body>
          {stackToEdit ? (
            <StackForm setHasError={(hasError) => setIsOpen(hasError)} editValues={{ name: stackToEdit.name, id: stackToEdit.id ?? 0 }} mode='update' />
          ) : (
            <StackForm setHasError={(hasError) => setIsOpen(hasError)} />
          )}
        </Modal.body>
      </Modal>
    </>
  );
};