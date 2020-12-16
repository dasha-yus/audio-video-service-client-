import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getItems, postItems } from '../../../service/CRUDService'

import '../Admin.css'

export default function AddNewVideo() {
    const [form, setForm] = useState({
        topic: '',
        title: '',
        image: '',
        video: '',
        description: ''
    })
    const history = useHistory()
    const [topicsList, setTopicsList] = useState([])

    useEffect(() => {
        getItems('video', false).then(res => {
            let set = new Set()
            res.data.forEach(video => {
                set.add(video.topic)
            })
            setTopicsList(Array.from(set))
        })
        .catch(err => alert(`${err.response.status} error occurred`))
    })

    const addVideo = () => {
        postItems('admin/new', { ...form }, true)
            .then(res => console.log(res))
            .catch(err => alert(`${err.response.status} error occurred`))

        history.push('/admin')
    }
    
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className='align'>
            <div className='card'>
                <form onSubmit={ addVideo }>
                    <div className='inputs'>
                        <div className='input'>
                            <input id='topic' type="text" list='topics' name="topic" value={ form.topic } onChange={ changeHandler } placeholder='Select a topic'></input>
                            <datalist id='topics' name="topic" value={form.topic} onChange={ changeHandler }>
                                {topicsList.map((topic, i) => (
                                    <option key={i}>{ topic }</option>
                                ))}
                            </datalist>
                            <i class="fas fa-paragraph"></i>
                        </div>
                        <div className='input'>
                            <input
                                placeholder="Title"
                                type="text"
                                name="title"
                                value={ form.title }
                                onChange={ changeHandler }
                            />
                            <i class="fas fa-heading"></i>
                        </div>
                        <div className='input'>
                            <input
                                placeholder="Image"
                                type="text"
                                name="image"
                                value={ form.image }
                                onChange={ changeHandler }
                            />
                            <i class="fas fa-image"></i>
                        </div>
                        <div className='input'>
                            <input
                                placeholder="Video"
                                type="text"
                                name="video"
                                value={ form.video }
                                onChange={ changeHandler }
                            />
                            <i class="fab fa-youtube"></i>
                        </div>
                        <div className='input'>
                            <input
                                placeholder="Description"
                                type="text"
                                name="description"
                                value={ form.description }
                                onChange={ changeHandler }
                            />
                            <i class="fas fa-align-justify"></i>
                        </div>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}