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


    return (project._id ?
        <div className="ProjectDetails">
            {project && (
                <div>
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                </div>
            )}

            <AddTask refreshProject={getProject} projectId={projectId} />
            {project.tasks.map((task)=> <TaskCard key={task._id} task={task}/>)}

        </div>
        :
        <div>
            <img src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif" alt="loading-img" width={300}/>
            <p>Loading...</p>
        </div>
    )
}