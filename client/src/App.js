import { useEffect, useState } from 'react'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth';
import {useCookies} from 'react-cookie';

function App() {
  const [cookies] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email;
  const [tasks,setTasks] = useState(null)
  const currentYear = new Date().getFullYear();

  const getData = async () =>{
    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    }catch (err) {
      console.error(err)
    }
  }

  useEffect(()=> {
    if(authToken){
      getData()
    }} 
    ,[authToken])

  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date))

  return (
    <div className='app'>
    {!authToken && <Auth/>}
    {authToken &&
    <>
    <ListHeader listName={'🏝️ Holiday Checklist'} getData={getData}/>
    <p className='user-email'>Welcome back {userEmail}</p>
    {sortedTasks?.map((task) =><ListItem key={task.id} task={task} getData={getData}/>)}
    </>}
    <p className="copyright">© Caliberz LLC {currentYear}</p>
    </div>
  );
}

export default App;
