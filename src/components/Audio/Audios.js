import React, {Component} from 'react'
import axios from 'axios'
import AudioList from '../common/AudioList'
import './AudioList.css'

export default class Audios extends Component {
  state = {
    audios: [],
    selectedPostId: null,
    search: ""
  };

  componentDidMount () {
    axios.get("http://localhost:5000/audio").then(res => {
      this.setState({ audios: res.data })
    })
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
      <div>
        <input type='text' onChange={this.searchChanged} value={this.state.search} className='search' placeholder='Search'/>
        <AudioList
          audios = { audios }
          search = { search }
          link = "/audio/"
        />
      </div>
    )
  }
}