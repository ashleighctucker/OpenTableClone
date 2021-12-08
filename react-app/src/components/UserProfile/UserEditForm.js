import { useState } from "react"
import { useDispatch} from "react-redux"

const UserEditForm = ({setShowModal, user}) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [username, setUsername] = useState(user.username)
    const [email, setEmail] = useState(user.email)
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault();
        if (username) {
          const data = await dispatch(
            // editUser(username, email, firstName, lastName)
          );
          if (data) {
            setErrors(data);
          }
        }
        setShowModal(false)
      };

    return (
    <form onSubmit={onSubmit} className='FormContainer'>
        <h1 className='EditHeader'>Edit User (buggy form)</h1>
        <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
        <div>
            <label className='EditFirstLabel'>First Name:</label>
            <input
            className='EditFirstInput'
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            ></input>
        </div>
        <div>
            <label className='EditLastLabel'>Last Name:</label>
            <input
            className='EditLastInput'
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            ></input>
        </div>
        <div>
            <label className='EditUsernameLabel'>User Name:</label>
            <input
            className='EditUsernameInput'
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            ></input>
        </div>
        <div>
            <label className='EditEmailLabel'>Email:</label>
            <input
            className='EditEmailInput'
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            ></input>
        </div>
        <button type='submit'>Save Changes</button>
        <button type='button' onClick={()=>setShowModal(false)}>Cancel</button>
      </form>
    )
}

export default UserEditForm
