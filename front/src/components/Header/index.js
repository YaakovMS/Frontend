import avatarImg from '../../assets/avatar.png';
import './header.css'

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';

import { FiHome, FiUser, FiSettings} from 'react-icons/fi'

export default function Header() {
    const { user } = useContext(AuthContext);

    return (
        <div className="sidebar">
            <div>
                <img src={user && user.avatarUrl ? user.avatarUrl : avatarImg} alt="foto do usuário" />
            </div>
            <Link to={'/dashboard'}>
            <FiHome  color=' #FFF ' size={24}/>
            Chamados
            </Link>
            <Link to={'/clientes'}>
            <FiUser  color=' #FFF ' size={24}/>
            Novo Cliente
            </Link>
            <Link to={'/profile'}>
            <FiSettings  color=' #FFF ' size={24}/>
            Perfil
            </Link>
           
        </div>
    );
}
