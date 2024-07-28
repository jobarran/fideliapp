'use client'


import { getProjects, deleteProjectById } from "@/actions";
import { useEffect, useState } from "react";

export const ProjectTable = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch projects when component mounts
        const fetchProjects = async () => {
            const projectsData = await getProjects();
            setProjects(projectsData.projects);
        };

        fetchProjects();
    }, []);

    const handleDelete = async (projectId) => {
        deleteProjectById(projectId)
        const updatedProjects = projects.filter(project => project.id !== projectId);
        setProjects(updatedProjects);
      };

    return (
        <div>
            <h1>Project List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>
                                <button onClick={() => handleDelete(project.id)}>x</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}