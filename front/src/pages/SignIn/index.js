import './signin.css'
import { useState, useContext } from 'react'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

export default function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signIn, loadingAuth } = useContext(AuthContext)

    async function handleSignIn(e) {
        e.preventDefault();

        if (email.trim() !== '' && password.trim() !== '') {
            await signIn(email, password)
        } else {
            // Optionally, you can add some error handling here
            console.log('Email and password must not be empty')
        }
    }

    return (
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={logo} alt='Logo do Sistema' />
                </div>

                <form onSubmit={handleSignIn}>
                    <h1>Entrar</h1>
                    <input 
                        type='text'
                        placeholder='user@email.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type='password'
                        placeholder='*****'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>{loadingAuth ?  'Carregando...': 'Acessar'}</button>
                </form>

                <Link to='/register'>Não possui uma conta?</Link>
            </div>
        </div>
    )
}
