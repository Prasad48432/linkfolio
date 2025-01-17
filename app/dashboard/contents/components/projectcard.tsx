import React from "react";

const ProjectCard = ({ project }: { project: any }) => {
  return(
    <div className="w-full h-36 rounded-md bg-secondary-bg border-secondary-border flex flex-col items-center justify-center text-primary-text">
        <p>{project.id}</p>
        <p>{project.name}</p>
        <p>{project.description}</p>
        <p>{project.github_link}</p>
    </div>
  )
};

export default ProjectCard;
