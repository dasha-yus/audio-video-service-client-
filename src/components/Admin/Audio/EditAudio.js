import axios from 'axios'
import React, { Component } from 'react'

import '../Admin.css'

export default class EditAudio extends Component {
    constructor(props) {
        super(props)
    
        this.onChangeSong = this.onChangeSong.bind(this)
        this.onChangeSinger = this.onChangeSinger.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangeMP3 = this.onChangeMP3.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            albom: '',
            song: '',
            singer: '',
            image: '',
            description: '',
            mp3: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/audio/' + this.props.match.params.id)
          .then(res => {
            this.setState({
                albom: res.data.albom,
                song: res.data.song,
                singer: res.data.singer,
                image: res.data.image,
                description: res.data.description,
                mp3: res.data.mp3
            });
        })
        .catch((error) => {
            console.log(error)
        })
    }

    onChangeSong(e) {
        this.setState({ song: e.target.value })
    }

    onChangeSinger(e) {
        this.setState({ singer: e.target.value })
    }

    onChangeImage(e) {
        this.setState({ image: e.target.value })
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value })
    }

    onChangeMP3(e) {
        this.setState({ mp3: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const audioObject = {
            albom: this.state.albom,
            song: this.state.song,
            singer: this.state.singer,
            image: this.state.image,
            description: this.state.description,
            mp3: this.state.mp3,
        };

        axios.put('http://localhost:5000/admin/audio/edit/' + this.props.match.params.id, audioObject,
            {
                headers: {
                    'Authorization': `admin` 
                }
            })
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
            
        this.props.history.push('/admin/audio')
    }

    render() {
        return (
            <div className='align'>
                <div className='card'>
                    <form onSubmit={ this.onSubmit }>
                        <div className='inputs'>
                        <div className='input'>
                            <input
                                type="text"
                                name="albom"
                                value={ this.state.albom }
                                disabled
                            />
                            <i class="fas fa-music"></i>
                        </div>
                        <div className='input'>
                            <input
                                type="text"
                                name="song"
                                value={ this.state.song }
                                onChange={ this.onChangeSong }
                            />
                            <i class="fas fa-music"></i>
                        </div>
                        <div className='input'>
                            <input
                                type="text"
                                name="singer"
                                value={ this.state.singer }
                                onChange={ this.onChangeSinger }
                            />
                            <i class="fas fa-user-alt"></i>
                        </div>
                        <div className='input'>
                            <input
                                placeholder="Image"
                                type="text"
                                name="image"
                                value={ this.state.image }
                                onChange={ this.onChangeImage }
                            />
                            <i class="fas fa-image"></i>
                        </div>
                        <div className='input'>
                            <input
                                placeholder="Description"
                                type="text"
                                name="description"
                                value={ this.state.description }
                                onChange={ this.onChangeDescription }
                            />
                            <i class="fas fa-align-justify"></i>
                        </div>
                        <div className='input'>
                            <input
                                placeholder="mp3"
                                type="text"
                                name="mp3"
                                value={ this.state.mp3 }
                                onChange={ this.onChangeMP3 }
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
}