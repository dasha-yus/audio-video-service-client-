import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import { getItems, deleteItems } from '../../service/CRUDService'
import './User.css'

export default class UsersList extends Component {
  state = {
    users: [],
  }

  componentDidMount () {
    getItems('admin/users/', true)
      .then(res => this.setState({ 'users': res.data }))
      .catch(err => alert(`${err.response.status} error occurred`))
  }

  deleteUser = (id) => {
    const conf = window.confirm(`Are you sure you want to delete the user?`)
    if (conf) {
      deleteItems(`admin/users/delete/${id}`)
        .then(res => {
          const users = this.state.users.filter(user => user._id !== id)
          this.setState({ users })
        })
        .catch(err => alert(`${err.response.status} error occurred`))
    }
  }

  render() {
    return (
      <div className='users'>
        <h2>All users</h2>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Hash Password</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {this.state.users.map((user, i) => (
                    <tr key={ i }>
                        <td>{ user.name }</td>
                        <td>{ user.email }</td>
                        <td>{ user.password }</td>
                        <td>{ user.role }</td>
                        <td><Link to={'/admin/users/edit/' + user._id}><i class="fas fa-edit"></i></Link></td>
                        <td><Link onClick={() => this.deleteUser(user._id)}><i class="fas fa-trash"></i></Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    )
  }
}