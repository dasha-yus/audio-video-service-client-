import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import axios from 'axios'

import UserContext from './context/UserContext'

import Navbar from './components/Navbar/Navbar'
import VideoList from './components/Video/Videos'
import Video from './components/Video/Video'
import AudioList from './components/Audio/Audios'
import Audio from './components/Audio/Audio'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Footer from './components/Footer/Footer'
import Playlists from './components/User/Playlists'

import AdminVideoList from './components/Admin/Video/AdminVideoList'
import AdminSingleVideo from './components/Admin/Video/SingleVideo'
import UsersList from './components/User/UsersList'
import NewVideo from './components/Admin/Video/AddNewVideo'
import AdminAudioList from './components/Admin/Audio/AdminAudioList'
import AdminSingleAudio from './components/Admin/Audio/AdminSingleAudio'
import AddNewAudio from './components/Admin/Audio/AddNewAudio'
import EditVideo from './components/Admin/Video/EditVideo'
import EditUser from './components/User/EditUser'
import EditAudio from './components/Admin/Audio/EditAudio'

import Error404 from './components/errors/Error404'

import './index.css'

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const ckeckLoggedIn = async () => {
      let token = localStorage.getItem('auth-token')
      if(token === null) {
        localStorage.setItem('auth-token', '')
        token = ''
      }
      const tokenRes = await axios.post('http://localhost:5000/users/tokenIsValid', null, { headers: { 'x-auth-token': token }})

      if(tokenRes.data) {
        const userRes = await axios.get('http://localhost:5000/users/', { headers: { 'x-auth-token': token } })
        setUserData({
          token,
          user: userRes.data
        })
      }

      const user = {
        id: localStorage.getItem('userId'),
        name: localStorage.getItem('username'),
        role: localStorage.getItem('userRole')
      }
      setUserData({ user: user })

    }
    ckeckLoggedIn()
  }, [])

  if (userData.user) {
    if (userData.user.role === 'admin') {
      return (
        <Router>
          <UserContext.Provider value={{ userData, setUserData }}>
            <div className="app">
              <Navbar />
              <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/admin" exact component={AdminVideoList}></Route>
                <Route path="/admin/new" exact component={NewVideo}></Route>
                <Route path="/admin/edit/:id" component={EditVideo} />
                <Route path="/admin/audio" exact component={AdminAudioList}></Route>
                <Route path="/admin/audio/new" exact component={AddNewAudio}></Route>
                <Route path="/admin/audio/edit/:id" component={EditAudio} />
                <Route path="/admin/audio/:id" exact component={AdminSingleAudio}></Route>
                <Route path="/admin/users" exact component={UsersList}></Route>
                <Route path="/admin/users/edit/:id" exact component={EditUser}></Route>
                <Route path="/admin/:id" exact component={AdminSingleVideo}></Route>
                <Route path='*' exact component={Error404} />
              </Switch>
              <Footer />
            </div>
          </UserContext.Provider>  
        </Router> 
      )
    } else {
      return (
        <Router>
          <UserContext.Provider value={{ userData, setUserData }}>
            <div className="app">
              <Navbar />
              <Switch>
                <Route path="/" exact component={VideoList} />
                <Route path="/audio" exact component={AudioList} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/:id" exact component={Video}></Route>
                <Route path="/audio/:id" exact component={Audio}></Route>
                <Route path="/user/:id/playlists" exact component={Playlists}></Route> 
                <Route path='*' exact component={Error404} />
              </Switch>
              <Footer />
            </div>
          </UserContext.Provider>  
        </Router>
      )
    }
  } else {
    return (
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <div className="app">
            <Navbar />
            <Switch>
              <Route path="/" exact component={VideoList} />
              <Route path="/audio" exact component={AudioList} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/:id" exact component={Video}></Route>
              <Route path="/audio/:id" exact component={Audio}></Route>
              <Route path="/user/:id/playlists" exact component={Playlists}></Route> 
              <Route path='*' exact component={Error404} />
            </Switch>
            <Footer />
          </div>
        </UserContext.Provider>  
      </Router>
    )
  }
}

export default App