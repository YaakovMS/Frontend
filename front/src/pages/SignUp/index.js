import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function SignUp(){
    const [name,setName ]= useState('')
    const [email,setEmail ]= useState('')
    const [password,setPassword ]= useState('')

    
    return(
      <div className='container-center'>
        <div className='login'>
            <div className='login-area'>
                <img src={logo} alt='Logo do Sistema' />
            </div>

<form>
    <h1>Entrar</h1>
    <input type='text'
     placeholder='Nome Completo'
     value={name}
     onChange={(e)=>{setName(e.target.value)}}

     />
     <input type='text'
     placeholder='user@email.com'
     value={email}
     onChange={(e)=>{setEmail(e.target.value)}}

     />
     <input type='password'
     placeholder='*****'
     value={password}
     onChange={(e)=>{setPassword(e.target.value)}}
     />
<button type='submit'>cadastrar</button>
</form>

<Link to='/'>Já possui uma conta?</Link>

        </div>
        </div>
    )
}