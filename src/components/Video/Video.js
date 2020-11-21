import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext'
import axios from 'axios';

import './Video.css'

const Video = () => {
    const { id } = useParams()
    const [post, setPost] = useState()

    const {userData} = useContext(UserContext)

    useEffect(() => {
        axios.get(`http://localhost:5000/video/${id}`).then(result => {
            setPost(result.data);
        })
    }, [id]);

    const likeVideo = (id) => {
        axios.put(`http://localhost:5000/video/${id}/like`, {userId: userData.user.id})
            .then(res => setPost(res.data))
            .catch(error => console.log(error)
        )
    }

    const unlikeVideo = (id) => {
        axios.put(`http://localhost:5000/video/${id}/unlike`, {userId: userData.user.id})
            .then(res => setPost(res.data))
            .catch(error => console.log(error))
    }

    const makeComment = (text, id) => {
        axios.put(`http://localhost:5000/video/${id}/comment`, {text: text, user: userData.user.name})
            .then(res => {
                setPost(res.data)
                document.getElementById("comment-form").reset();
            })
            .catch(error => console.log(error))
    }

    const addToPlaylist = (title, image, userId) => {
        axios.put(`http://localhost:5000/video/add/${userId}`, {title: title, image: image})
            .then(alert('The video was successfully added to the playlist'))
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
    }

    return (
        <div className='post'>
            <h1>{post?.title}</h1>
            <div className='adaptive-wrap'>
                <iframe width='560' height='315' src={post?.video}
                    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                    gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
            </div>
            <h6>{post?.description}</h6>

            {/* like the video */}
            <div className='likes'>
                {typeof userData.token == "undefined"
                ? <span />
                : post?.likes.includes(userData.user.id)
                    ? <i class="fas fa-thumbs-down like" onClick={() => {unlikeVideo(post?._id)}}></i>
                    : <i class="fas fa-thumbs-up like" onClick={() => {likeVideo(post?._id)}}></i>
                }
                <h6>{post?.likes.length} likes</h6>
            </div>
            
            {/* add to playlist */}
            {typeof userData.token == "undefined"
            ? <span />
            : (
                <Link onClick={() => addToPlaylist(post?.title, post?.image, userData.user.id)} className='button edit'>Add to Playlist</Link>
            )}

            {/* add a comment */}
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

export default Video;