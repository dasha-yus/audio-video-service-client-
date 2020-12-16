import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import UserContext from '../../context/UserContext'
import { getItems, putItems } from '../../service/CRUDService'
import SectionsUnderThePost from '../common/SectionsUnderThePost'

const Audio = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const { userData } = useContext(UserContext)

    useEffect(() => {
        getItems(`audio/${id}`, false)
            .then(res => setPost(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))
    }, [id])

    const likeAudio = (id, numberOfViews) => {
        putItems(`audio/${id}/like`, { userId: userData.user.id, numberOfViews: numberOfViews })
            .then(res => setPost(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))
    }

    const unlikeAudio = (id, numberOfViews) => {
        putItems(`audio/${id}/unlike`, { userId: userData.user.id, numberOfViews: numberOfViews })
            .then(res => setPost(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))
    }

    const makeComment = (text, id, userId) => {
        putItems(`audio/${id}/comment`, { text: text, user: userData.user.name, userId: userId })
            .then(res => setPost(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))

        document.getElementById("comment-form").reset()
    }

    const addToPlaylist = (audioId, song, singer, image, userId) => {
        putItems(`audio/add/${ userId }`, { audioId: audioId, song: song, singer: singer, image: image })
            .then(res => console.log(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))

        alert('The video was successfully added to the playlist')
    }

    return (
        <div className='single-post'>
            <h1>{ post?.song }</h1>
            <div className='audio-main'>
                <img src={post?.image} alt='audio-img'></img>
                <div>
                    <h6 id='description'>{ post?.description }</h6>
                    <div className='mp3'><audio src={ post?.mp3 } controls/></div>
                </div>
            </div>

            <SectionsUnderThePost
                like = { likeAudio }
                unlike = { unlikeAudio }
                addToPlaylist = { addToPlaylist }
                makeComment = { makeComment }
                post = { post }
                type = 'audio'
            />
        </div>
    )
}

export default Audio