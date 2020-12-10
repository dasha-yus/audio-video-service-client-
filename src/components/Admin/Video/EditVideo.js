import axios from 'axios'
import React, { Component } from 'react'

import '../Admin.css'

export default class EditVideo extends Component {
    constructor(props) {
        super(props)
    
        this.onChangeTopic = this.onChangeTopic.bind(this)
        this.onChangeTitle = this.onChangeTitle.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.onChangeVideo = this.onChangeVideo.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            topic: '',
            title: '',
            image: '',
            video: '',
            description: '',
            videos: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/video/' + this.props.match.params.id)
          .then(res => {
            this.setState({
                topic: res.data.topic,
                title: res.data.title,
                image: res.data.image,
                video: res.data.video,
                description: res.data.description
            });
        })
        .then(axios.get("http://localhost:5000/video").then(res => {
            this.setState({ videos: res.data })
        }))
        .catch((error) => {
            console.log(error)
        })
    }

    onChangeTopic(e) {
        this.setState({ topic: e.target.value })
    }

    onChangeTitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangeImage(e) {
        this.setState({ image: e.target.value })
    }

    onChangeVideo(e) {
        this.setState({ video: e.target.value })
    }

    onChangeDescription(e) {
        this.setState({ description: e.target.value })
    }

    getVideoTopics = array => {
        let set = new Set()
        array.map(video => {
          set.add(video.topic)
        })
        return Array.from(set)
    }

    onSubmit(e) {
        e.preventDefault()

        const videoObject = {
            topic: this.state.topic,
            title: this.state.title,
            image: this.state.image,
            video: this.state.video,
            description: this.state.description
        };

        axios.put('http://localhost:5000/admin/edit/' + this.props.match.params.id, videoObject,
            {
                headers: {
                    'x-auth-token': localStorage.getItem('x-auth-token') 
                }
            })
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
            
        this.props.history.push('/admin')
    }

    render() {
        return (
            <div className='align'>
                <div className='card edit-video'>
                    <form onSubmit={this.onSubmit}>
                        <div className='inputs'>
                            <select name="topic" value={ this.state.topic } onChange={this.onChangeTopic} className='input'>
                                { this.getVideoTopics(this.state.videos).map(topic => (
                                    <option>{ topic }</option>
                                ))}
                            </select>
                            <div className='input'>
                                <input
                                    placeholder="Title"
                                    type="text"
                                    name="title"
                                    value={ this.state.title }
                                    onChange={ this.onChangeTitle }
                                />
                                <i class="fas fa-heading"></i>
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
                                    placeholder="Video"
                                    type="text"
                                    name="video"
                                    value={ this.state.video }
                                    onChange={ this.onChangeVideo }
                                />
                                <i class="fab fa-youtube"></i>
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
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )  
    }
}