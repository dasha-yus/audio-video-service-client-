import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import VideoList from '../../common/VideoList'
import '../Admin.css'
import { BASE_URL } from '../../../config'

export default class AdminVideoList extends Component {
  state = {
    videos: [],
    selectedPostId: null,
    search: ""
  };

  componentDidMount () {
    axios.get(`${BASE_URL}video`).then(res => {
      this.setState({ videos: res.data })
    })
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id })
  }

  searchChanged = event => {
    this.setState({ search: event.target.value })
  }

  render() {
    const { videos } = this.state 
    const { search } = this.state

    return (
      <div className='videos'>
        <input type='text' onChange={ this.searchChanged } value={ this.state.search } className='search' placeholder='Search'/>
        <div className='btns'>
          <Link to='/admin/new' className='new new-video'>NEW VIDEO</Link>
        </div>
        <VideoList
          videos = { videos }
          search = { search }
          link = "/admin/"
        />
      </div>
    )
  }
}