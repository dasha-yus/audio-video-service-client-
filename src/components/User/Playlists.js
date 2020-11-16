import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useParams } from "react-router-dom";
import UserContext from '../../context/UserContext';


const Playlists = () => {
    const { id } = useParams()
    const [user, setUser] = useState()

    const {userData} = useContext(UserContext)

    useEffect(() => {
        axios.get(`http://localhost:5000/user/${id}`).then(result => {
            setUser(result.data);
        })
    }, [id]);

    const removeVideoFromPlaylist = (title, image) => {
        axios.put(`http://localhost:5000/user/${id}/playlists`, {id: userData.user.id, title: title, image: image})
            .then(res => setUser(res.data))
            .catch(error => console.log(error))
    }

    const removeAudioFromPlaylist = (song, singer, image) => {
        axios.put(`http://localhost:5000/user/${id}/playlists`, {id: userData.user.id, song: song, singer: singer, image: image})
            .then(res => setUser(res.data))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <h2>Video</h2>
            <div className='list'>
                {user?.videoPlaylist.map((video) => (
                    <div>
                        <img className='img' src={video.image}></img>
                        <h4>{video.title} <i class="fas fa-ban" onClick={() => removeVideoFromPlaylist(video.title, video.image)}></i></h4>
                    </div>
                ))} 
            </div>
            <h2>Audio</h2>
            <div className='audio'>
                {user?.audioPlaylist.map((audio) => (
                    <div className='child'>
                        <img className='img' src={audio.image}></img>
                        <h3>{audio.song} <i class="fas fa-ban" onClick={() => removeAudioFromPlaylist(audio.song, audio.singer, audio.image)}></i></h3>
                        <h5>{audio.singer}</h5>
                    </div>
                ))} 
            </div>
        </div>      
    )
}

export default Playlists