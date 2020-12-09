import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, Link } from "react-router-dom"
import axios from 'axios'
import UserContext from '../../../context/UserContext'
import '../Admin.css'

const SingleVideo = () => {
    const { id } = useParams()
    const [post, setPost] = useState()
    const history = useHistory()
    const { userData } = useContext(UserContext)

    useEffect(() => {
        axios.get(`http://localhost:5000/video/${id}`).then(result => {
            setPost(result.data)
        })
    }, [id])

    const deleteVideo = (id) => {
        const conf = window.confirm(`Are you sure you want to delete this video?`)
        if (conf) {
            axios.delete(`http://localhost:5000/admin/delete/${id}`,
                {
                    headers: {
                        'Authorization': `${userData.user.role}` 
                    }
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            history.push('/admin')
        }
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
            <Link to={`/admin/edit/${ post?._id }`} class="button edit">Edit</Link>
            <Link onClick={() => deleteVideo(post?._id)} class="button delete">Delete</Link>
        </div>
    );
}

export default SingleVideo