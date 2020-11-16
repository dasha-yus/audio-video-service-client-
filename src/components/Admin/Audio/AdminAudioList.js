import React, {Component} from 'react'
import axios from 'axios';
import AllAudios from '../../common/AudioList'
import '../Admin.css'
import { Link } from 'react-router-dom';

export default class AdminAudioList extends Component {
  state = {
    audios: [],
    selectedPostId: null,
    search: ""
  };

  componentDidMount () {
    axios.get("http://localhost:5000/audio").then(res => {
      this.setState({ audios: res.data });
    })
  }

  componentDidUpdate() {
    axios.get("http://localhost:5000/audio").then(res => {
      this.setState({ audios: res.data });
    })
  }

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id});
  }

  searchChanged = event => {
    this.setState({ search: event.target.value })
  }

  render() {
    const {audios} = this.state 
    const {search} = this.state

    return (
      <div className='audios'>
        <input type='text' onChange={this.searchChanged} value={this.state.search} className='search' placeholder='Search'/>
        <div className='btns'>
          <Link to='/admin/audio/new' className='new new-video'>NEW AUDIO</Link>
        </div>
        <AllAudios
          audios = {audios}
          search = {search}
          link = "/admin/audio/"
        />
      </div>
    )
  }
}