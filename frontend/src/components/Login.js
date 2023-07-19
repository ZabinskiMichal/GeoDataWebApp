import { useRef, useState, useEffect, useContext} from 'react';
import AuthContext from '../context/Authprovider';
import axios from "../api/axios";

const LOGIN_URL = "/auth/login";



export default function Login() {

    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();


    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
        
    }, [])

    useEffect(() =>{
        setErrMsg('');
    }, [email, password])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({email, password}),
                {
                    headers: {'Content-Type': 'application/json'},
                    // withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));


            // tutj przechowamy nasz token
            const accessToken = response?.data?.accessToken;
            
            
            // tutaj tez jest mozliwosc przechwucenia roli, to byla by tablica
            
            // const roles = response?.data?.roles;

            // setAuth({email, password, roles, accessToken}); //jest to przechowywane w globalnym kontekscie
            setAuth({email, password, accessToken}); //jest to przechowywane w globalnym kontekscie



            setEmail('');
            setPassword('');
            setSuccess(true);

        } catch (err) {

            if(!err?.response) {
                setErrMsg("Brak odpowiedzi serwera")
            } else if (err.respose?.status === 400){
                setErrMsg("Brak emaila lub hasła")
            } else if (err.response?.status === 401) {
                setErrMsg("brak autorycaji!")
            } else{
                setErrMsg("Logowanie nie powiodło się")
            }

            errRef.current.focus();

        }
        
    }



  return (
    <>
    {success ? (
        <section>
            <h1>Zalogowano!</h1>
            <br />
            <p>
                <a href='#'>Przejdz na strone glowna</a>
            </p>
        </section>
    ) : (
    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        
        <h1>Zaloguj się</h1>

        <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <label htmlFor='email'>Email:</label>
            <input 
                type='text'
                id="email"
                ref={emailRef}
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
            />


            {/* PASSWORD */}

            <label htmlFor='password'>Hasło:</label>
            <input 
                type='password'
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />

            <button>Zaloguj się</button>

        </form>

        <p>
            Nie posiadasz konta? <br />
            <span className='line'>
                {/* tutaj trzeba bedzie odac route */}
                <a href='#'>Zarejestruj się</a>
            </span>
        </p>


    </section>
    )}
    
    </>

  )
}
