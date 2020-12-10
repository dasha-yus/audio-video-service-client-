import React, {Component } from 'react'
import axios from 'axios'
import './VideoList.css'
import VideoList from '../common/VideoList'
import { BASE_URL } from '../../config'

export default class Videos extends Component {
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
      <div>
        <input type='text' onChange={this.searchChanged} value={this.state.search} className='search' placeholder='Search'/>
        <VideoList
          videos = { videos }
          search = { search }
          link = "/"
        />
      </div>
    )
  }
}