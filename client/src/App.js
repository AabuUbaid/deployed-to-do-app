import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie"

function App() {
  const [cookies, setCookie, removeCookies] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const serverUrl = process.env.REACT_APP_TODO_SERVER_URL || "http://localhost:8000"

  const [tasks, setTasks] = useState(null)


  const getData = async () => {

    try {
      const response = await fetch(`${serverUrl}/todos/${userEmail}`)
      const json = await response.json()
      setTasks(json)
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }
    , [])

  console.log(tasks);

  //Sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))


  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken &&
        <>
          <ListHeader listName={'🏝️🌺 Holiday Tick List'} getData={getData} />
          <p className="user-email">Welcome back {userEmail}</p>
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
        </>}
      <p className="=copyright">©️ Aabutterfly Coding LLC</p>
    </div>
  );
}

export default App;
