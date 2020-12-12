import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from "react-router-dom"
import { getItems, deleteItems } from '../../../service/CRUDService'
import '../Admin.css'

const SingleVideo = () => {
    const { id } = useParams()
    const [post, setPost] = useState()
    const history = useHistory()

    useEffect(() => {
        getItems(`video/${id}`, false)
            .then(res => setPost(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))
    }, [id])

    const deleteVideo = (id) => {
        const conf = window.confirm(`Are you sure you want to delete this video?`)
        if (conf) {
            deleteItems(`admin/delete/${id}`)
                .then(res => console.log(res))
                .catch(err => alert(`${err.response.status} error occurred`))

            history.push('/admin')
        }
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
            <Link to={`/admin/edit/${ post?._id }`} class="button edit">Edit</Link>
            <Link onClick={() => deleteVideo(post?._id)} class="button delete">Delete</Link>
        </div>
    );
}

export default SingleVideo