import React from 'react'
import { Link } from 'react-router-dom'
import { limitNumberOfViews } from '../../utils/utils'
import { putItems } from '../../service/CRUDService'

const AudioList = ({ audios, search, link }) => {

  const getAlboms = array => {
    let set = new Set()
    array.forEach(audio => {
      set.add(audio.albom)
    })
    return Array.from(set)
  }

  const deleteCategory = albom => {
    const conf = window.confirm(`Are you sure you want to delete the albom ${ albom }?`)
    if (conf) {
      putItems('audio/delete-category', { albom: albom })
        .then(res => console.log(res))
        .catch(err => alert(`${err.response.status} error occurred`))
    }
  }

  return (
    <div className='audios'>
      <div>
        <h2>Popular</h2>
        <div className='audio'>
          {audios.sort((a, b) => b.numberOfViews - a.numberOfViews).slice(0, 4).filter(audio => audio.song.toLowerCase().includes(search)).map((filteredAudio, i) => (
            <Link to={ link + filteredAudio._id } className='child' key={i} onClick={ limitNumberOfViews }>
              <img className='img' src={ filteredAudio.image } alt='audio-img'></img>
              <h3>{ filteredAudio.song }</h3>
              <h5>{ filteredAudio.singer }</h5>
            </Link>
          ))}
        </div>
        { getAlboms(audios).map(albom => (
          <div>
            <div className='category'>
              <h2>{ albom }</h2>
              {!localStorage.getItem('x-auth-token') || localStorage.getItem('userRole') !== 'admin'
              ? <span />
              : (
                <h2 className='delete-category' onClick={() => deleteCategory(albom)}>Delete albom</h2>
              )}
            </div>
            <div className='audio'>
              {audios.filter(audio => audio.albom === albom).filter(audio => audio.song.toLowerCase().includes(search)).map((audio, i) => (
                <Link to={ link + audio._id } className='child' key={i} onClick={ limitNumberOfViews }>
                  <img className='img' src={ audio.image } alt='audio-img'></img>
                  <h3>{ audio.song }</h3>
                  <h5>{ audio.singer }</h5>
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