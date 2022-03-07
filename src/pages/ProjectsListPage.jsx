import axios from "axios";
import { useState } from "react";
import { useEffect } from "react-dom";
import AddProject from "../components/AddProject";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsListPage(){

    const [projects, setProjects] = useState([]);

    const API_URL = "http://localhost:5000";
    

    // --------- put away in a folder -------
    const getAllProjects = ()=>{
        axios.get(`${API_URL}/api/projects`)
        .then((response)=>{setProjects(response.data)})
        .catch((err)=>{console.log(err)})
    }
    // --------- put away in a folder -------
    
    useEffect(()=>{
        getAllProjects();
    }, []);
    

    return(
        <div className="ProjectListPage">
            <AddProject refreshProjects={getAllProjects} />

            {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
            ))}
        </div>
    )
}