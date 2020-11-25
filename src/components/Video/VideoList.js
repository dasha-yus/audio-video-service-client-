import React, {Component } from 'react'
import axios from 'axios'
import './VideoList.css'
import UserContext from '../../context/UserContext'
import AllVideos from '../common/VideoList'

export default class VideoList extends Component {
  state = {
    videos: [],
    selectedPostId: null,
    search: ""
  };

  componentDidMount () {
    axios.get("http://localhost:5000/video").then(res => {
      this.setState({ videos: res.data })
    })
  }

  postSelectedHandler = id => {
    this.setState({selectedPostId: id});
  }

  searchChanged = event => {
    this.setState({ search: event.target.value })
  }

  render() {
    const {videos} = this.state 
    const {search} = this.state

    return (
      <div>
        <input type='text' onChange={this.searchChanged} value={this.state.search} className='search' placeholder='Search'/>
        <AllVideos
          videos = {videos}
          search = {search}
          link = "/"
        />
      </div>
      
    )
  }
}