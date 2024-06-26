import '../SignIn/signin.css'
import { useState, useContext } from 'react'
import logo07 from '../../assets/logo07.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { signUp, loadingAuth } = useContext(AuthContext)

    async function handleSubmit(e) {
        e.preventDefault()
        
        if (name.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
            await signUp(email, password, name)
        }
    }

    return (
        <div className='container-center'>
            <div className='background-image'></div> {/* Adicionando a imagem de fundo */}
            <div className='login'>
                <div className='login-area'>
                    <img src={logo07} alt='Logo do Sistema' />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Criar uma conta</h1>
                    <input
                        type='text'
                        placeholder='Nome Completo'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    <button type='submit'>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
                </form>

                <Link to='/'>Já possui uma conta?</Link>
            </div>
        </div>
    )
}
