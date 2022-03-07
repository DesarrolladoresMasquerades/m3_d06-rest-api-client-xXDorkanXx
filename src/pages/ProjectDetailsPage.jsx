import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";

export default function ProjectDetailsPage(){

    const [project, setProject] = useState({});
    const { projectId } = useParams();

    const API_URL = "http://localhost:5005";

    const getProject = ()=>{
        axios.get(`${API_URL}/api/projects/${projectId}`)
        .then((response)=>{setProject(response.data)})
        .catch((err)=>{console.log(err)})
    }

    useEffect(() => {
        getProject();
    }, []);


    return (
        <div className="ProjectDetails">
            {project && (
                <div>
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                    <button onClick={()=>console.log("project: ", project, " project tasks array: ", project.tasks, " tasks array length: ", project.tasks.length)}>consolelog</button>
                </div>
            )}

            <AddTask refreshProject={getProject} projectId={projectId} />
            

        </div>
    )
}