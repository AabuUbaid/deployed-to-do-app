import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import TickIcon from './TickIcon'
import Modal from './Modal'

function ListItem({task, getData}) {
  const [showModal, setModal] = useState(false)

  const deleteItem = async() => {
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
        method:"DELETE",
      })
      if (response.status === 200){
        getData()
      }
    } catch(err) {
      console.error(err)
    }
  }
  return (
    <li className='list-item'>
    
    <div className="info-contain">
    <TickIcon/>
      <p className='task-item'>{task.title}</p>
      <ProgressBar progress={task.progress}/>
    </div>


<div className="button-container">
  <button className='edit' onClick={()=> setModal(true)}>EDIT</button>
  <button className='delete' onClick={deleteItem}>DELETE</button>
</div>
{showModal && <Modal mode={'edit'} setModal={setModal} getData={getData} task = {task}/>}
    </li>
  )
}

export default ListItem