import { useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword , signOut} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [ loading, setLoading] = useState(true)

    const navigate = useNavigate();

    // Load user from local storage on app start
    useEffect(() => {
        const loadStorage = () => {
            const storageUser = localStorage.getItem('@ticketsPRO');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false)
            }
            setLoading(false)
        };

        loadStorage();
    }, []);

    // Function to sign in the user
    async function signIn(email, password) {
        setLoadingAuth(true);
        try {
            const value = await signInWithEmailAndPassword(auth, email, password);
            let uid = value.user.uid;
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            };
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem-Vindo(a) de volta!');
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            setLoadingAuth(false);
            toast.error('Ops, algo deu errado!');
        }
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
            toast.success('Seja bem vindo!');
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

    async function logout(){
        await signOut(auth)
        localStorage.removeItem('@ticketPRO')
        setUser(null)

    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                logout,
                loadingAuth,
                loading,
                storageUser,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
