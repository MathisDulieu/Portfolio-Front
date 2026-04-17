import { useEffect, useState } from 'react';
import { getAllProjects, createProject, updateProject, deleteProject } from '../api/projectApi';
import ProjectCard from '../components/ProjectCard';

const emptyForm = { title: '', description: '', techStack: '', githubUrl: '', demoUrl: '' };

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(null);

    const fetchProjects = async () => {
        try {
            const data = await getAllProjects();
            setProjects(data);
        } catch (e) {
            setError('Failed to load projects');
        }
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleSubmit = async () => {
        try {
            if (editingId) {
                await updateProject(editingId, form);
            } else {
                await createProject(form);
            }
            setForm(emptyForm);
            setEditingId(null);
            fetchProjects();
        } catch (e) {
            setError('Failed to save project');
        }
    };

    const handleEdit = (project) => {
        setForm({ ...project });
        setEditingId(project.id);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProject(id);
            fetchProjects();
        } catch (e) {
            setError('Failed to delete project');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Projects</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="bg-white rounded-xl shadow p-6 mb-8 flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-gray-700">
                    {editingId ? 'Edit Project' : 'New Project'}
                </h2>
                {['title', 'description', 'techStack', 'githubUrl', 'demoUrl'].map((field) => (
                    <input key={field} placeholder={field}
                           value={form[field]}
                           onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                           className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                ))}
                <div className="flex gap-2">
                    <button onClick={handleSubmit}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm">
                        {editingId ? 'Update' : 'Create'}
                    </button>
                    {editingId && (
                        <button onClick={() => { setForm(emptyForm); setEditingId(null); }}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg text-sm">
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project}
                                 onDelete={handleDelete} onEdit={handleEdit} />
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;