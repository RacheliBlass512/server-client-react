import React, { useState } from 'react'
import { logIn } from '../../service/getAndSetData';

export default function Login({ updateUserDetails, closeForm }) {
    const [id, setid] = useState('');
    const [password, setpassword] = useState('')
    const [errors, seterrors] = useState({
        id: ' ',
        password: ' ',
        match: ' '
    })
    const [showError, setshowError] = useState(false)

    async function idMatchPsrd(passwordT) {
        let userDetails = await logIn({ id: id, password: passwordT })
        return userDetails
    }

    function saveDetails(userDetails) {
        localStorage.setItem('currUserDetails', JSON.stringify(userDetails))
        updateUserDetails({ ...userDetails })
        setpassword('');
        setid('');
        closeForm()
    }

    function handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case 'id':
                let idError = value.length === 0
                    ? 'this filed requierd'
                    : ''
                seterrors(prevErrors => ({
                    ...prevErrors, id: idError
                }))
                setid(value);
                break;
            case 'password':
                let passwordError = value.length === 0
                    ? 'this filed requierd'
                    : ''
                seterrors(prevErrors => ({
                    ...prevErrors, password: passwordError
                }))
                setpassword(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (id.length === 0) {
            seterrors(prevErrors => ({ ...prevErrors, id: 'this filed requierd' }))
        }
        if (password.length === 0) {
            seterrors(prevErrors => ({ ...prevErrors, password: 'this filed requierd' }))
        } else {
            let userDetails = await idMatchPsrd(password)
            if (userDetails.error == null)
                await saveDetails(userDetails);
            else {
                let matchError = userDetails.error;
                seterrors(prevErrors => ({
                    ...prevErrors, match: matchError
                }))
                setshowError(true)
            }
        }
    }



    return (
        <div className='wrapper-r'>
            <div className='form-wrapper'>
                <h2>כניסה</h2>
                <form noValidate>
                    <div className='id'>
                        <label htmlFor="id">תעודת זהות</label>
                        <input type='text' name='id' value={id} onChange={handleChange} />
                        {errors.id.length > 0 &&
                            <span className='error'>{errors.id}</span>}
                    </div>
                    <div className='password'>
                        <label htmlFor="password">סיסמא</label>
                        <input type='password' name='password' value={password} onChange={handleChange} noValidate />
                        {(errors.password.length > 0) &&
                            <span className='error' value={password}>{errors.password}</span>}
                    </div>
                    <div className='submit'>
                        <button onClick={handleSubmit}>כניסה</button>
                    </div>
                    {(showError) &&
                        <span className='error'>{errors.match}</span>}
                </form>
            </div>
        </div>
    )
}