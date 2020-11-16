import React, {Component, useContext} from 'react'
import axios from 'axios';

import './User.css'
import { Link } from 'react-router-dom';

export default class UsersList extends Component {
  state = {
    users: [],
    selectedPostId: null,
  };

  componentDidMount () {
    axios.get("http://localhost:5000/admin/users").then(res => {
      this.setState({ users: res.data });
    })
  }

  componentDidUpdate() {
    axios.get("http://localhost:5000/admin/users").then(res => {
      this.setState({ users: res.data });
    })
  }

  deleteUser = (id) => {
    axios.delete(`http://localhost:5000/admin/users/delete/${id}`)
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
                    <tr key={i}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
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