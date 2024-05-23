import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    const navigate = useNavigate();

    // Load user from local storage on app start
    useEffect(() => {
        const loadStorage = () => {
            const storageUser = localStorage.getItem('@ticketsPRO');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
        };

        loadStorage();
    }, []);

    // Function to sign in the user
    function signIn(email, password) {
        console.log(email);
        console.log(password);
        alert('Logado com sucesso');
    }

    // Function to sign up a new user
    async function signUp(email, password, name) {
        setLoadingAuth(true);
        try {
            const value = await createUserWithEmailAndPassword(auth, email, password);
            const uid = value.user.uid;

            await setDoc(doc(db, "users", uid), {
                nome: name,
                avatarUrl: null,
            });

            const data = {
                uid: uid,
                nome: name,
                email: value.user.email,
                avatarUrl: null,
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Seja bem vindo');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            toast.error('Erro ao criar conta. Tente novamente.');
            setLoadingAuth(false);
        }
    }

    // Store user data in local storage
    function storageUser(data) {
        localStorage.setItem('@ticketsPRO', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                loadingAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
