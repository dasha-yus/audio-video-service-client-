import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/UserContext'

const Audio = () => {
    const { id } = useParams();
    const [post, setPost] = useState();
    const {userData} = useContext(UserContext)

    useEffect(() => {
        axios.get(`http://localhost:5000/audio/${id}`).then(result => {
            setPost(result.data);
        })
    }, [id]);

    const likeAudio = (id) => {
        axios.put(`http://localhost:5000/audio/${id}/like`, {userId: userData.user.id})
            .then(res => setPost(res.data))
            .catch(error => console.log(error)
        )
    }

    const unlikeAudio = (id) => {
        axios.put(`http://localhost:5000/audio/${id}/unlike`, {userId: userData.user.id})
            .then(res => setPost(res.data))
            .catch(error => console.log(error))
    }

    const makeComment = (text, id) => {
        axios.put(`http://localhost:5000/audio/${id}/comment`, {text: text, user: userData.user.name})
            .then(res => {
                setPost(res.data)
                document.getElementById("comment-form").reset();
            })
            .catch(error => console.log(error))
    }

    const addToPlaylist = (song, singer, image, userId) => {
        axios.put(`http://localhost:5000/audio/add/${userId}`, {song: song, singer: singer, image: image})
            .then(alert('The audio was successfully added to the playlist'))
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
    }

    return (
        <div className='single-post'>
            <h1>{post?.song}</h1>
            <div className='audio-main'>
                <img src={post?.image}></img>
                <div>
                    <h6 id='description'>{post?.description}</h6>
                    <div className='mp3'><audio src={post?.mp3} controls/></div>
                </div>
            </div>

            <div className='likes'>
                {typeof userData.token == "undefined"
                ? <span />
                : post?.likes.includes(userData.user.id)
                    ? <i class="fas fa-thumbs-down like" onClick={() => {unlikeAudio(post?._id)}}></i>
                    : <i class="fas fa-thumbs-up like" onClick={() => {likeAudio(post?._id)}}></i>
                }
                <h6>{post?.likes.length} likes</h6>
            </div>

            {typeof userData.token == "undefined"
            ? <span />
            : (
                <Link onClick={() => addToPlaylist(post?.song, post?.singer, post?.image, userData.user.id)} className='button edit'>Add to Playlist</Link>
            )}

            {typeof userData.token == "undefined"
            ? <span />
            : (
                <form id='comment-form' onSubmit={(e) => 
                    {e.preventDefault()
                    makeComment(e.target[0].value, post?._id)
                }} className='comment-form'>
                    <textarea class='form-control' name="text" placeholder="Add a comment"></textarea>
                    <button id='submit'>Submit</button>
                </form>
            )}
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
    );
}

export default Audio;