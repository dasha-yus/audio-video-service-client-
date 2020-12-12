import React, {Component } from 'react'
import './VideoList.css'
import VideoList from '../common/VideoList'
import { getItems } from '../../service/CRUDService'

export default class Videos extends Component {
  state = {
    videos: [],
    selectedPostId: null,
    search: ""
  };

  componentDidMount () {
    getItems('video', false)
      .then(res => this.setState({ videos: res.data }))
      .catch(err => alert(`${err.response.status} error occurred`))
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