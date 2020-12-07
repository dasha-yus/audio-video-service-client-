import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from "react-router-dom"
import axios from 'axios'
import UserContext from '../../context/UserContext'

const Audio = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const { userData } = useContext(UserContext)

    useEffect(() => {
        axios.get(`http://localhost:5000/audio/${id}`).then(result => {
            setPost(result.data);
        })
    }, [id])

    const likeAudio = (id, numberOfViews) => {
        axios.put(`http://localhost:5000/audio/${id}/like`, { userId: userData.user.id, numberOfViews: numberOfViews })
            .then(res => setPost(res.data))
            .catch(error => console.log(error)
        )
    }

    const unlikeAudio = (id, numberOfViews) => {
        axios.put(`http://localhost:5000/audio/${id}/unlike`, { userId: userData.user.id, numberOfViews: numberOfViews })
            .then(res => setPost(res.data))
            .catch(error => console.log(error))
    }

    const makeComment = (text, id, userId) => {
        axios.put(`http://localhost:5000/audio/${id}/comment`, { text: text, user: userData.user.name, userId: userId })
            .then(res => {
                setPost(res.data)
                document.getElementById("comment-form").reset()
            })
            .catch(error => console.log(error))
    }

    const addToPlaylist = (audioId, song, singer, image, userId) => {
        axios.put(`http://localhost:5000/audio/add/${userId}`, { audioId: audioId, song: song, singer: singer, image: image })
            .then(alert('The audio was successfully added to the playlist'))
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
    }

    return (
        <div className='single-post'>
            <h1>{ post?.song }</h1>
            <div className='audio-main'>
                <img src={post?.image}></img>
                <div>
                    <h6 id='description'>{ post?.description }</h6>
                    <div className='mp3'><audio src={ post?.mp3 } controls/></div>
                </div>
            </div>

            {/* like the audio */}
            <div className='likes'>
                { userData.user ?
                    userData.user.role !== 'user'
                    ? <span />
                    : post?.likes.includes(userData.user.id)
                        ? <i class="fas fa-thumbs-down like" onClick={() => { unlikeAudio(post?._id, post?.numberOfViews) }}></i>
                        : <i class="fas fa-thumbs-up like" onClick={() => { likeAudio(post?._id, post?.numberOfViews) }}></i>
                : <span />}
                <h6>{ post?.likes.length } likes<br/><br/>{ post?.numberOfViews } views</h6>
            </div>

            {/* add to playlist */}
            {userData.user ?
                userData.user.role !== 'user'
                    ? <span />
                    : <Link onClick={() => addToPlaylist(post?._id, post?.song, post?.singer, post?.image, userData.user.id)} className='button edit'>Add to Playlist</Link>
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
                        <div className="username"><strong>{comment.user}</strong></div>
					    <div class="text">{comment.text}</div>
                    </div>
                ))}
		    </div>
        </div>
    )
}

export default Audio