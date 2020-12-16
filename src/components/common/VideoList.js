import React from 'react'
import { Link } from 'react-router-dom'
import { limitNumberOfViews, getVideoTopics } from '../../utils/utils'
import { putItems } from '../../service/CRUDService'

const VideoList = ({ videos, search, link }) => {

  const deleteCategory = topic => {
    const conf = window.confirm(`Are you sure you want to delete category ${ topic }?`)
    if (conf) {
      putItems('video/delete-category', { topic: topic })
        .then(res => console.log(res))
        .catch(err => alert(`${err.response.status} error occurred`))
    }
  }

  return (
    <div className='videos'>
      <div>
        <h2>Popular</h2>
        <div className='list'>
          {videos.sort((a, b) => b.numberOfViews - a.numberOfViews).slice(0, 7).filter(video => video.title.toLowerCase().includes(search)).map((filteredVideo, i) => (
            <Link to={ link + filteredVideo._id } key={i} onClick={limitNumberOfViews}>
              <img className='img' src={ filteredVideo.image } alt='video-img'></img>
              <h4>{ filteredVideo.title }</h4>
            </Link>
          ))}
        </div>
      </div>
      <div>
        { getVideoTopics(videos).map((topic, i) => (
          <div key={i}>
            <div className='category'>
              <h2>{topic}</h2>
              {!localStorage.getItem('x-auth-token') || localStorage.getItem('userRole') !== 'admin'
              ? <span />
              : (
                <h2 className='delete-category' onClick={() => deleteCategory(topic)}>Delete category</h2>
              )}
            </div>
            <div className='list'>
              { videos.filter(video => video.topic === topic).filter(video => video.title.toLowerCase().includes(search)).map((filteredVideo, i) => (
                <Link to={ link + filteredVideo._id } key={i} onClick={limitNumberOfViews}>
                  <img className='img' src={ filteredVideo.image } alt='video-img'></img>
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