'use client';

import { ProjectTypeProps } from '@/src/app/dashboard/project/types';
import { Button } from '@/src/components/Button';
import { ListOfProjects } from './ListOfProjects';
import { useState } from 'react';
import { Modal } from '@/src/components/Modal';
import { ProjectForm } from './ProjectForm';
import { TechStackTypeProps } from '@/src/app/dashboard/techstack/types';

interface ProjectProps {
  projects: ProjectTypeProps[];
  techstacks?: TechStackTypeProps[]
}

export const Project: React.FC<ProjectProps> = ({ projects, techstacks }) => {

  const [openFormModal, setOpenFormModal] = useState<boolean>(false);
  const [dataToEdit, setDataToEdit] = useState<ProjectTypeProps | undefined>(undefined);

  return (
    <div className="mt-4">
      <Button size="md" variant="primary" className="mb-4" onClick={() => {
        setOpenFormModal(!openFormModal);
        setDataToEdit(undefined);
      }}>
        Add Project
      </Button>
      <div className="grid grid-cols-3 gap-2">
        {(projects ?? []).map((item) => {
          return (
            <ListOfProjects key={item.id} project={item} onEdit={(dataToEdit) => {
              setDataToEdit(dataToEdit);
              setOpenFormModal(!openFormModal);
            }} />
          );
        })}
      </div>
      <Modal isOpen={openFormModal} onClose={() => setOpenFormModal(!openFormModal)}>
        <Modal.header title={dataToEdit ? 'Update project' : 'Add new project'} onClose={() => setOpenFormModal(!openFormModal)} />
        <Modal.body>
          <ProjectForm initValues={dataToEdit} mode={dataToEdit ? 'update' : 'create'} techstacks={techstacks} />
        </Modal.body>
      </Modal>
    </div>
  );
};