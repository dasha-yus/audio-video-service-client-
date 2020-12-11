import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext'
import { putItems } from '../../service/CRUDService'

const AudioList = ({ audios, search, link }) => {
  let views = 0
  const { userData } = useContext(UserContext)

  const getAlboms = array => {
      let set = new Set()
      array.map(audio => {
        set.add(audio.albom)
      })
      return Array.from(set)
  }

  const limitNumberOfViews = (e) => {
    views = localStorage.getItem('numberOfViews')
    if (!localStorage.getItem('x-auth-token') ) {
      if (views >= 10) {
        e.preventDefault()
        alert("Please, log in to continue")
      }
      localStorage.setItem('numberOfViews', ++views)
    }
  }

  const deleteCategory = albom => {
    const conf = window.confirm(`Are you sure you want to delete the albom ${ albom }?`)
    if (conf) putItems('audio/delete-category', { albom: albom })
  }

  return (
    <div className='audios'>
      <div>
        <h2>Popular</h2>
        <div className='audio'>
          {audios.sort((a, b) => b.numberOfViews - a.numberOfViews).slice(0, 4).filter(audio => audio.song.toLowerCase().includes(search)).map((filteredAudio, i) => (
            <Link to={link + filteredAudio._id} className='child' key={i} onClick={limitNumberOfViews}>
              <img className='img' src={filteredAudio.image}></img>
              <h3>{filteredAudio.song}</h3>
              <h5>{filteredAudio.singer}</h5>
            </Link>
          ))}
        </div>
        { getAlboms(audios).map(albom => (
          <div>
            <div className='category'>
              <h2>{albom}</h2>
              {typeof userData.token == "undefined" || userData.user.role == 'user'
              ? <span />
              : (
                <h2 className='delete-category' onClick={() => deleteCategory(albom)}>Delete albom</h2>
              )}
            </div>
            <div className='audio'>
              {audios.filter(audio => audio.albom === albom).filter(audio => audio.song.toLowerCase().includes(search)).map((audio, i) => (
                <Link to={ link + audio._id } className='child' key={i} onClick={ limitNumberOfViews }>
                  <img className='img' src={ audio.image }></img>
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