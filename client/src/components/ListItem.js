import React, { useState } from 'react'
import TickIcon from './TickIcon'
import ProgressBar from './ProgressBar'
import Modal from './Modal'

function ListItem({ task, getData }) {
    const serverUrl = process.env.REACT_APP_TODO_SERVER_URL || "http://localhost:8000"

    const [showModal, setShowModal] = useState(false)

    const deleteItem = async () => {
        try {
            const response = await fetch(`${serverUrl}/todos/${task.id}`, {
                method: "DELETE"
            })
            if (response.status === 200) {
                getData()
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <li className='list-item'>

            <div className='info-container'>
                <TickIcon />
                <p className='task-title'>{task.title}</p>
                <ProgressBar progress={task.progress} />
            </div>

            <div className="button-container">
                <button className='edit' onClick={() => setShowModal(true)}>EDIT</button>
                <button className='delete' onClick={deleteItem}>DELETE</button>
            </div>
            {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
        </li>
    )
}

export default ListItem