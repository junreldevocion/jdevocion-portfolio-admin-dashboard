'use client';

import { Button } from '@/src/components/Button';
import { ListOfProjects } from './ListOfProjects';
import { useState } from 'react';
import { Modal } from '@/src/components/Modal';
import { ProjectForm } from './ProjectForm';
import { TechStackInput } from '@/src/lib/techstack/techstack.schema';
import { ProjectInputResponse } from '@/src/lib/project/Project.interface';

interface ProjectProps {
  projects: ProjectInputResponse[]
  techstacks?: TechStackInput[]
}

export const Project: React.FC<ProjectProps> = ({ projects, techstacks }) => {

  const [openFormModal, setOpenFormModal] = useState<boolean>(false);
  const [dataToEdit, setDataToEdit] = useState<ProjectInputResponse | undefined>(undefined);

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
          <ProjectForm initValues={dataToEdit} mode={dataToEdit ? 'update' : 'create'} onClose={(bol) => setOpenFormModal(bol)} techstacks={techstacks} />
        </Modal.body>
      </Modal>
    </div>
  );
};