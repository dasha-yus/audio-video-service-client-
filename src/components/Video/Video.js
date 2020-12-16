import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import UserContext from '../../context/UserContext'
import { getItems, putItems } from '../../service/CRUDService'
import SectionsUnderThePost from '../common/SectionsUnderThePost'

const Video = () => {
    const { id } = useParams()
    const [post, setPost] = useState()

    const { userData } = useContext(UserContext)

    useEffect(() => {
        getItems(`video/${id}`, false)
            .then(res => setPost(res.data))
            .catch(err => console.log(`${err.response.status} error occurred`))
    }, [id])

    const likeVideo = (id, numberOfViews) => {
        putItems(`video/${id}/like`, { userId: userData.user.id, numberOfViews: numberOfViews })
            .then(res => setPost(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))
    }

    const unlikeVideo = (id, numberOfViews) => {
        putItems(`video/${id}/unlike`, { userId: userData.user.id, numberOfViews: numberOfViews })
            .then(res => setPost(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))
    }

    const makeComment = (text, id, userId) => {
        putItems(`video/${id}/comment`, { text: text, user: userData.user.name, userId: userId })
            .then(res => setPost(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))

        document.getElementById("comment-form").reset()
    }

    const addToPlaylist = (videoId, title, image, userId) => {
        putItems(`video/add/${ userId }`, { videoId: videoId, title: title, image: image })
            .then(res => console.log(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))

        alert('The video was successfully added to the playlist')
    }

    return (
        <div className='post'>
            <h1>{ post?.title }</h1>
            <div className='adaptive-wrap'>
                <iframe width='560' height='315' src={ post?.video } title={ post?.title }
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                    gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
            </div>
            <h6>{ post?.description }</h6>

            <SectionsUnderThePost
                like = { likeVideo }
                unlike = { unlikeVideo }
                addToPlaylist = { addToPlaylist }
                makeComment = { makeComment }
                post = { post }
                type = 'video'
            />
        </div>
    );
}

export default Video