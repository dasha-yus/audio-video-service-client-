import React, { useState, useEffect, useContext } from 'react'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext'
import { getItems, putItems } from '../../service/CRUDService'

import './Video.css'

const Video = () => {
    const { id } = useParams()
    const [post, setPost] = useState()

    const { userData } = useContext(UserContext)

    useEffect(() => {
        getItems(`video/${id}`, setPost, false)
    }, [id])

    const likeVideo = (id, numberOfViews) => {
        putItems(`video/${id}/like`, { userId: userData.user.id, numberOfViews: numberOfViews }, setPost)
    }

    const unlikeVideo = (id, numberOfViews) => {
        putItems(`video/${id}/unlike`, { userId: userData.user.id, numberOfViews: numberOfViews }, setPost)
    }

    const makeComment = (text, id, userId) => {
        putItems(`video/${id}/comment`, { text: text, user: userData.user.name, userId: userId }, setPost)
        document.getElementById("comment-form").reset()
    }

    const addToPlaylist = (videoId, title, image, userId) => {
        putItems(`video/add/${ userId }`, { videoId: videoId, title: title, image: image }, null)
        alert('The video was successfully added to the playlist')
    }

    return (
        <div className='post'>
            <h1>{ post?.title }</h1>
            <div className='adaptive-wrap'>
                <iframe width='560' height='315' src={ post?.video }
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                    gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
            </div>
            <h6>{ post?.description }</h6>

            {/* like the video */}
            <div className='likes'>
                { userData.user ?
                    userData.user.role !== 'user'
                    ? <span />
                    : post?.likes.includes(userData.user.id)
                        ? <i class="fas fa-thumbs-down like" onClick={() => { unlikeVideo(post?._id, post?.numberOfViews) }}></i>
                        : <i class="fas fa-thumbs-up like" onClick={() => { likeVideo(post?._id, post?.numberOfViews) }}></i>
                : <span />}
                <h6>{ post?.likes.length } likes<br/><br/>{ post?.numberOfViews } views</h6>
            </div>
            
            {/* add to playlist */}
            {userData.user ?
                userData.user.role !== 'user'
                    ? <span />
                    : <Link onClick={() => addToPlaylist(post?._id, post?.title, post?.image, userData.user.id)} className='button edit'>Add to Playlist</Link>
                : <span />
            }

            {/* add a comment */}
            { userData.user ?
                userData.user.role !== 'user'
                ? <span />
                : (
                    <form id='comment-form' onSubmit={(e) => {
                        e.preventDefault()
                        makeComment(e.target[0].value, post?._id, userData.user.id)
                    }} className='comment-form'>
                        <textarea class='form-control' name="text" placeholder="Add a comment"></textarea>
                        <button id='submit'>Submit</button>
                    </form>
                ) : <span />
            }

            {/* comments block */}
            <div className="comments">
                {post?.comments.map((comment, i) => (
                    <div className="comment" key={i}>
                        <div className="username"><strong>{ comment.user }</strong></div>
					    <div class="text">{ comment.text }</div>
                    </div>
                ))}
		    </div>
        </div>
    );
}

export default Video