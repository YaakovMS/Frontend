import { FiSettings, FiUpload } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import avatar from '../../assets/avatar.png';
import './profile.css';

import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export default function Profile() {
    const { user, storageUser, setUser, logout } = useContext(AuthContext);
    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);
    const [imageAvatar, setImageAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image));
            } else {
                alert('Envie uma imagem do tipo png ou jpeg');
            }
        }
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name='Meu Perfil'>
                    <FiSettings size={25} />
                </Title>

                <div className="container">
                    <form className="form-profile">
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25} />
                            </span>
                            <input type="file" accept="image/*" onChange={handleFile} /><br />
                            {avatarUrl === null ? (
                                <img src={avatar} alt="Foto de perfil" width={250} />
                            ) : (
                                <img src={avatarUrl} alt="Foto de perfil" width={250} />
                            )}
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <label>Email</label>
                        <input type="text" value={email} disabled />
                        <button type="submit">Salvar</button>
                    </form>
                </div>
                <div className="container">
                    <button className="logout-btn" onClick={() => logout()}>Sair</button>
                </div>
            </div>
        </div>
    );
}
