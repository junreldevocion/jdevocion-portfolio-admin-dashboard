'use client';

import { Button } from '@/src/components/Button';
import { Card } from '@/src/components/Card';
import { ListOfStacks } from './ListOfStacks';
import { useState } from 'react';
import { Modal } from '@/src/components/Modal';
import { StackForm } from './StackForm';
import { TechStackTypeProps } from '@/src/app/dashboard/techstack/types';

interface TechStackProps {
  data: TechStackTypeProps[] | undefined
}

export const TechStack: React.FC<TechStackProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stackToEdit, setStackToEdit] = useState<TechStackTypeProps | null>(null);
  return (
    <>
      <Card title='List of technologies' className="mt-12">
        <Card.header title='List of technologies' className='pb-4 font-medium text-base' />
        <Card.body>
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
                    <ListOfStacks key={stack.id} stack={stack} onEdit={(item) => {
                      setStackToEdit(item);
                      setIsOpen(true);
                    }} />
                  ))
                }
              </tbody>
            </table>
          </div>
        </Card.body>
      </Card>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.header title={!stackToEdit ? 'Add technology' : 'Update technology'} onClose={() => setIsOpen(!isOpen)} />
        <Modal.body>
          {stackToEdit ? (
            <StackForm setHasError={(hasError) => setIsOpen(hasError)} initValues={{ name: stackToEdit.name, id: stackToEdit.id }} mode='update' />
          ) : (
            <StackForm setHasError={(hasError) => setIsOpen(hasError)} />
          )}
        </Modal.body>
      </Modal>
    </>
  );
};