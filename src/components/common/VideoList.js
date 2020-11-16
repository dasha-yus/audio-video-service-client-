import React from 'react'
import { Link, useHistory } from 'react-router-dom';

const VideoList = ({ videos, search, link }) => {
  let numberOfViews = window.$numberOfViews
  const history = useHistory()

  const getVideoTopics = array => {
      let set = new Set()
      array.map(video => {
        set.add(video.topic)
      })
      return Array.from(set)
  }

  // const limitNumberOfViews = () => {
  //   console.log(numberOfViews)
  //   ++numberOfViews
  //   if (numberOfViews === 10) history.push('/login')
  // }

  return (
    <div className='videos'>
      <div>
        <h2>Popular</h2>
        <div className='list'>
          {videos.sort((a, b) => b.numberOfViews - a.numberOfViews).slice(0, 7).filter(video => video.title.toLowerCase().includes(search)).map((filteredVideo, i) => (
            <Link to={link + filteredVideo._id} key={i} >
              <img className='img' src={filteredVideo.image}></img>
              <h4>{filteredVideo.title}</h4>
            </Link>
          ))}
        </div>
      </div>
      <div>
        {getVideoTopics(videos).map(topic => (
          <div>
            <h2>{topic}</h2>
            <div className='list'>
              {videos.filter(video => video.topic === topic).filter(video => video.title.toLowerCase().includes(search)).map((filteredVideo, i) => (
                <Link to={link + filteredVideo._id} key={i}>
                  <img className='img' src={filteredVideo.image}></img>
                  <h4>{filteredVideo.title}</h4>
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