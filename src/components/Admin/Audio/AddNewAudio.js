import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getItems, postItems } from '../../../service/CRUDService'

import '../Admin.css'

export default function AddNewAudio() {
    const [form, setForm] = useState({
        albom: '',
        song: '',
        singer: '',
        image: '',
        description: '',
        mp3: ''
    })
    const history = useHistory()
    const [topicsList, setTopicsList] = useState([])

    const addAudio = () => {
        postItems('admin/audio/new', { ...form }, true)
        history.push('/admin/audio')
    }

    useEffect(() => {
        getItems('audio', false).then(res => {
            let set = new Set()
            res.data.map(audio => {
                set.add(audio.albom)
            })
            setTopicsList(Array.from(set))
        })
    })
    
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    return (
        <div className='align'>
            <div className='card'>
                <form onSubmit={ addAudio }>
                    <div className='inputs'>
                        <div className='input'>
                            <input id='topic' type="text" list='alboms' name="albom" value={form.albom} onChange={changeHandler} placeholder='Select an albom'></input>
                            <datalist id='alboms' name="albom" value={form.albom} onChange={changeHandler}>
                                 {topicsList.map(albom => (
                                    <option>{albom}</option>
                                ))}
                            </datalist>
                            <i class="fas fa-compact-disc"></i>
                        </div>
                        <div className='input'>
                            <input
                                placeholder="Song"
                                type="text"
                                name="song"
                                value={ form.song }
                                onChange={ changeHandler }
                            />
                            <i class="fas fa-music"></i>
                        </div>
                        <div className='input'>
                            <input
                                placeholder="Singer"
                                type="text"
                                name="singer"
                                value={ form.singer }
                                onChange={ changeHandler }
                            />
                            <i class="fas fa-user-alt"></i>
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
                                placeholder="Description"
                                type="text"
                                name="description"
                                value={ form.description }
                                onChange={ changeHandler }
                            />
                            <i class="fas fa-align-justify"></i>
                        </div>
                        <div className='input'>
                            <input
                                placeholder="mp3"
                                type="text"
                                name="mp3"
                                value={ form.mp3 }
                                onChange={ changeHandler }
                            />
                            <i class="fas fa-file-audio"></i>
                        </div>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}