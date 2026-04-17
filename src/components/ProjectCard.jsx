const ProjectCard = ({ project, onDelete, onEdit }) => {
    return (
        <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3">
            <h2 className="text-xl font-bold text-gray-800">{project.title}</h2>
            <p className="text-gray-500 text-sm">{project.description}</p>
            <span className="text-xs text-indigo-500 font-medium">{project.techStack}</span>
            <div className="flex gap-2 mt-auto">
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer"
                       className="text-sm text-gray-600 hover:text-black underline">
                        GitHub
                    </a>
                )}
                {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer"
                       className="text-sm text-gray-600 hover:text-black underline">
                        Demo
                    </a>
                )}
            </div>
            <div className="flex gap-2">
                <button onClick={() => onEdit(project)}
                        className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-1 rounded-lg">
                    Edit
                </button>
                <button onClick={() => onDelete(project.id)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm py-1 rounded-lg">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;