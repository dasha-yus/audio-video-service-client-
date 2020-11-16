import React from 'react'
import { Link, useHistory } from 'react-router-dom';

const AudioList = ({ audios, search, link }) => {
    let numberOfViews = window.$numberOfViews
    const history = useHistory()

    const getAlboms = array => {
        let set = new Set()
        array.map(audio => {
          set.add(audio.albom)
        })
        return Array.from(set)
    }

    // const limitNumberOfViews = () => {
    //   console.log(numberOfViews)
    //   ++numberOfViews
    //   if (numberOfViews === 10) history.push('/login')
    // }

    return (
        <div className='audios'>
          <div>
            <h2>Popular</h2>
            <div className='audio'>
              {audios.sort((a, b) => b.numberOfViews - a.numberOfViews).slice(0, 4).filter(audio => audio.song.toLowerCase().includes(search)).map((filteredAudio, i) => (
                <Link to={link + filteredAudio._id} className='child' key={i}>
                  <img className='img' src={filteredAudio.image}></img>
                  <h3>{filteredAudio.song}</h3>
                  <h5>{filteredAudio.singer}</h5>
                </Link>
              ))}
            </div>
            {getAlboms(audios).map(albom => (
              <div>
                <h2>{albom}</h2>
                <div className='audio'>
                  {audios.filter(audio => audio.albom === albom).filter(audio => audio.song.toLowerCase().includes(search)).map((audio, i) => (
                    <Link to={link + audio._id} className='child' key={i}>
                      <img className='img' src={audio.image}></img>
                      <h3>{audio.song}</h3>
                      <h5>{audio.singer}</h5>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
}

export default AudioList