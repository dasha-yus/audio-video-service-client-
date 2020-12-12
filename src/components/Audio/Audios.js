import React, {Component} from 'react'
import AudioList from '../common/AudioList'
import { getItems } from '../../service/CRUDService'
import './AudioList.css'

export default class Audios extends Component {
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