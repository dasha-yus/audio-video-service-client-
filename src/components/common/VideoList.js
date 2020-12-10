import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import axios from 'axios'
import { BASE_URL } from '../../config'

const VideoList = ({ videos, search, link }) => {
  let views = 0
  const { userData } = useContext(UserContext)

  const getVideoTopics = array => {
      let set = new Set()
      array.map(video => {
        set.add(video.topic)
      })
      return Array.from(set)
  }

  const limitNumberOfViews = (e) => {
    views = localStorage.getItem('numberOfViews')
    if (!userData.user) {
      if (views >= 10) {
        e.preventDefault()
        alert("Please, log in to continue")
      }
      localStorage.setItem('numberOfViews', ++views)
    }
  }

  const deleteCategory = topic => {
    const conf = window.confirm(`Are you sure you want to delete category ${ topic }?`)
    if (conf) {
      axios.put(`${BASE_URL}video/delete-category`, { topic: topic },
        {
          headers: {
            'x-auth-token': localStorage.getItem('x-auth-token') 
        }
        })
        .then(res => console.log(res.data))
        .catch(error => console.log(error))
    }
  }

  return (
    <div className='videos'>
      <div>
        <h2>Popular</h2>
        <div className='list'>
          {videos.sort((a, b) => b.numberOfViews - a.numberOfViews).slice(0, 7).filter(video => video.title.toLowerCase().includes(search)).map((filteredVideo, i) => (
            <Link to={ link + filteredVideo._id } key={i} onClick={limitNumberOfViews}>
              <img className='img' src={ filteredVideo.image }></img>
              <h4>{ filteredVideo.title }</h4>
            </Link>
          ))}
        </div>
      </div>
      <div>
        { getVideoTopics(videos).map(topic => (
          <div>
            <div className='category'>
              <h2>{topic}</h2>
              {typeof userData.token == "undefined" || userData.user.role == 'user'
              ? <span />
              : (
                <h2 className='delete-category' onClick={() => deleteCategory(topic)}>Delete category</h2>
              )}
            </div>
            <div className='list'>
              { videos.filter(video => video.topic === topic).filter(video => video.title.toLowerCase().includes(search)).map((filteredVideo, i) => (
                <Link to={ link + filteredVideo._id } key={i} onClick={limitNumberOfViews}>
                  <img className='img' src={filteredVideo.image}></img>
                  <h4>{ filteredVideo.title }</h4>
                </Link>
              ))} 
            </div>
          </div>
          ))}
      </div>
    </div>
  )
}

export default VideoList