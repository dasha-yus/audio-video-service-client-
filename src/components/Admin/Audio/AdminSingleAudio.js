import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from "react-router-dom"
import { getItems, deleteItems } from '../../../service/CRUDService'

const AdminSingleAudio = () => {
    const { id } = useParams()
    const [post, setPost] = useState()
    const history = useHistory()

    useEffect(() => {
        getItems(`audio/${id}`, false)
            .then(res => setPost(res.data))
            .catch(err => alert(`${err.response.status} error occurred`))
    }, [id])

    const deleteAudio = (id) => {
        const conf = window.confirm(`Are you sure you want to delete this audio?`)
        if (conf) {
            deleteItems(`admin/audio/delete/${id}`)
                .then(res => console.log(res))
                .catch(err => alert(`${err.response.status} error occurred`))

            history.push('/admin/audio')
        }
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
            <Link to={`/admin/audio/edit/${ post?._id }`} class="button edit">Edit</Link>
            <Link onClick={() => deleteAudio(post?._id)} class="button delete">Delete</Link>
        </div>
    )
}

export default AdminSingleAudio