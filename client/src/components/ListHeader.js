import React, { useState } from 'react'
import Modal from './Modal'
import {useCookies} from 'react-cookie';

function ListHeader({listName, getData}) {
  const [removeCookie] = useCookies(null)
  const [showModal, setModal] = useState(false)

  const signOut = () => {
    console.log('signout')
    removeCookie('Email')
    removeCookie('AuthToken')

    window.location.reload()
  }

  return (
    <div className='list-header'>
      <h1>{listName}</h1>
      <div className="button-container">
        <button className='create' onClick={()=>setModal(true)}>ADD NEW</button>
        <button className="signout" onClick={signOut}>SIGN OUT</button>
      </div>
      {showModal && <Modal mode={'create'} setModal={setModal} getData={getData}/>}
    </div>
  )
}

export default ListHeader