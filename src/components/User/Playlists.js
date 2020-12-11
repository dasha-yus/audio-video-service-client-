import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from "react-router-dom"
import UserContext from '../../context/UserContext'
import { getItems, putItems } from '../../service/CRUDService'

const Playlists = () => {
    const { id } = useParams()
    const [user, setUser] = useState()

    const { userData } = useContext(UserContext)

    useEffect(() => {
        getItems(`user/${id}`, true).then(res => setUser(res.data))
    }, [id])

    const removeVideoFromPlaylist = (videoId, title, image) => {
        const conf = window.confirm(`Are you sure you want to delete ${title} from your playlist?`)
        if (conf) {
            putItems(`user/${id}/playlists/video`, { id: userData.user.id, videoId: videoId, title: title, image: image })
                .then(res => setUser(res.data))
        }
    }

    const removeAudioFromPlaylist = (audioId, song, singer, image) => {
        const conf = window.confirm(`Are you sure you want to delete ${song} from your playlist?`)
        if (conf) {
            putItems(`user/${id}/playlists/audio`, { id: userData.user.id, audioId: audioId, song: song, singer: singer, image: image })
                .then(res => setUser(res.data))
        }
    }

    return (
        <div>
            {user?.videoPlaylist.length === 0 && user?.audioPlaylist.length === 0
            ? <h2>There playlist is empty</h2>
            : (
                <div>
                    <h2>Video</h2>
                    <div className='playlist'>
                        {user?.videoPlaylist.map(video => (
                            <div>
                                <Link to={`/${ video.videoId }`}><img className='img' src={ video.image }></img></Link>
                                <h4>{video.title} <i class="fas fa-ban" onClick={() => removeVideoFromPlaylist(video.videoId, video.title, video.image)}></i></h4>
                            </div>
                        ))} 
                    </div>
                    <h2 className='audio-playlist-title'>Audio</h2>
                    <div className='playlist audio-playlist'>
                        {user?.audioPlaylist.map(audio => (
                            <div className='child'>
                                <Link to={`/audio/${ audio.audioId }`}><img className='img' src={ audio.image }></img></Link>
                                <h3>{ audio.song } <i class="fas fa-ban" onClick={() => removeAudioFromPlaylist(audio.audioId, audio.song, audio.singer, audio.image)}></i></h3>
                                <h5>{ audio.singer }</h5>
                            </div>
                        ))} 
                    </div>
                </div>
            )}
        </div>      
    )
}

export default Playlists