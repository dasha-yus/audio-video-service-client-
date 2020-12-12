import React, {Component} from 'react'
import { getItems, putItems } from '../../service/CRUDService'
import './User.css'

export default class EditUser extends Component {
    constructor(props) {
        super(props)
    
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            name: '',
            email: '',
            role: ''
        }
    }

    componentDidMount() {
        getItems(`admin/users/` + this.props.match.params.id, true).then(res => {
            this.setState({
                name: res.data.name,
                email: res.data.email,
                role: res.data.role
            })
        })
        .catch(err => alert(`${err.response.status} error occurred`))
    }

    onChangeName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangeRole(e) {
        this.setState({ role: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const userObject = {
            name: this.state.name,
            email: this.state.email,
            role: this.state.role
        };

        putItems('admin/users/edit/' + this.props.match.params.id, userObject)
            .then(res => console.log(res))
            .catch(err => alert(`${err.response.status} error occurred`))
          
        this.props.history.push('/admin/users')
    }

    render() {
        return (
            <div className='align'>
                <div className='card edit-form'>
                    <form onSubmit={ this.onSubmit }>
                        <div className='inputs'>
                            <div className='input'>
                                <input
                                    type="text"
                                    name="name"
                                    value={ this.state.name }
                                    onChange={ this.onChangeName }
                                />
                                <i class="fas fa-user"></i>
                            </div>
                            <div className='input'>
                                <input
                                    type="text"
                                    name="email"
                                    value={ this.state.email }
                                    onChange={ this.onChangeEmail }
                                />
                                <i class="fas fa-at"></i>
                            </div>
                            <select name="role" value={ this.state.role } onChange={ this.onChangeRole } className='input'>
                                <option>user</option>
                                <option>admin</option>
                            </select>
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        )  
    }
}