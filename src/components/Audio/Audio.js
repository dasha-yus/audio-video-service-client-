import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link } from "react-router-dom"
import UserContext from '../../context/UserContext'
import { getItems, putItems } from '../../service/CRUDService'

const Audio = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const { userData } = useContext(UserContext)

    useEffect(() => {
        getItems(`audio/${id}`, false).then(res => setPost(res.data))
    }, [id])

    const likeAudio = (id, numberOfViews) => {
        putItems(`audio/${id}/like`, { userId: userData.user.id, numberOfViews: numberOfViews }).then(res => setPost(res.data))
    }

    const unlikeAudio = (id, numberOfViews) => {
        putItems(`audio/${id}/unlike`, { userId: userData.user.id, numberOfViews: numberOfViews }).then(res => setPost(res.data))
    }

    const makeComment = (text, id, userId) => {
        putItems(`audio/${id}/comment`, { text: text, user: userData.user.name, userId: userId }).then(res => setPost(res.data))
        document.getElementById("comment-form").reset()
    }

    const addToPlaylist = (audioId, song, singer, image, userId) => {
        putItems(`audio/add/${ userId }`, { audioId: audioId, song: song, singer: singer, image: image }).then(res => console.log(res.data))
        alert('The video was successfully added to the playlist')
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