import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getItems } from '../../../service/CRUDService'
import AudioList from '../../common/AudioList'
import '../Admin.css'

export default class AdminAudioList extends Component {
  state = {
    audios: [],
    selectedPostId: null,
    search: ""
  };

  componentDidMount () {
    getItems('audio', false)
      .then(res => this.setState({ audios: res.data }))
      .catch(err => alert(`${err.response.status} error occurred`))
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id })
  }

  searchChanged = event => {
    this.setState({ search: event.target.value })
  }

  render() {
    const { audios } = this.state 
    const { search } = this.state

    return (
      <div className='audios'>
        <input type='text' onChange={this.searchChanged} value={ this.state.search } className='search' placeholder='Search'/>
        <div className='btns'>
          <Link to='/admin/audio/new' className='new new-video'>NEW AUDIO</Link>
        </div>
        <AudioList
          audios = { audios }
          search = { search }
          link = "/admin/audio/"
        />
      </div>
    )
  }
}