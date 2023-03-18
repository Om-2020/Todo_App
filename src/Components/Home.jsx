import React , { useEffect, useState } from 'react';

import Task from './Task';

const Home = () =>{

    const initialarr = localStorage.getItem("tasks") ? 
    JSON.parse(localStorage.getItem("tasks")) : [];

    const [tasks,setTask] = useState(initialarr);
    const [title,Settitle] = useState("");
    const [description,setDescription] = useState("");


    const submitHandler = (e) =>{
      e.preventDefault();
      setTask([...tasks,{
        title,
        description,

      }]);
      Settitle("");
      setDescription("");
      
    };

    const deleteTask = (index)=>{

      const fillteredarr = tasks.filter((val,i) => {
        return i !==index;
      });
      setTask(fillteredarr);
    };

    useEffect(()=>{
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },[tasks]);
    

  return (
    <div className='container'>
        <h1>DAILY GOALS</h1>
        <form onSubmit={submitHandler} >
            <input type="text" placeholder='Enter the Daily task' 
            value={title}
            onChange={(e)=>Settitle(e.target.value)}>
              
            </input>
            <textarea placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}>

            </textarea>
            <button type="submit">ADD</button>
        </form>

        {
           tasks.map((item,index)=>(
            <Task key={index} title={item.title} 
            description={item.description}
            deleteTask = {deleteTask}
            index = {index}/>
           ))
        }       
    </div>
  )
}

export default Home;