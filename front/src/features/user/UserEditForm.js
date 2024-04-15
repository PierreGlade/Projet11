import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUserData, updateUserData } from './userSlice'
import { getAuthToken } from '../auth/authSlice'

function UserEditForm({ setEditToggle }) {
    const dispatch = useDispatch()
    const token = useSelector(getAuthToken)
    const user = useSelector(getUserData)
    const [userNames, setUserNames] = useState({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
    })

    const canSave = Boolean(userNames.firstName) && Boolean(userNames.lastName) && Boolean(userNames.username)

    const handleCancel = () => {
        setEditToggle(false)
    }

    const handleChange = (event) => {
        setUserNames({
            ...userNames,
            [event.target.name]: event.target.value,
        })
    }

    const handleEdit = async () => {
        const data = { token, userNames }
        if (canSave) {
            dispatch(updateUserData(data))
            setEditToggle(false)
        }
    }

    return (
        <div>
            <div className="edit-wrapper">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={userNames.username}
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder={user.firstName}
                    value={userNames.firstName}
                    onChange={(e) => handleChange(e)}
                    disabled 
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder={user.lastName}
                    value={userNames.lastName}
                    onChange={(e) => handleChange(e)}
                    disabled 
                />
            </div>
            <div className="edit-wrapper">
                <button
                    className="edit-content-button"
                   disabled={!canSave}
                    onClick={handleEdit}
                    
                >
                    Save
                </button>
                <button
                    className="edit-content-button"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default UserEditForm