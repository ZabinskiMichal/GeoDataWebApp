import { useRef, useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import axios from "../api/axios";
import { Link, useNavigate, useLocation} from 'react-router-dom';

const LOGIN_URL = "/auth/login";


export default function Login() {

    // ten globalny auth bedziemy wykorzystywali tez w innych czesciach aplikcaji
    const { setAuth } = useAuth();


    const navigate = useNavigate();
    const location = useLocation();

    //tutaj co zrobic w przypadku cofniecia strony
    const from = location.state?.from?.pathname || "/";


    
    const emailRef = useRef();
    const errRef = useRef();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errMsg, setErrMsg] = useState('');


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
            console.log(accessToken)

            const roles = response?.data?.roles;


            console.log(roles);

            // setAuth({email, password, roles, accessToken}); //jest to przechowywane w globalnym kontekscie
            setAuth({email, password, roles, accessToken}); //jest to przechowywane w globalnym kontekscie

            setEmail('');
            setPassword('');

            //aktualnie po zalogowaniu, zostaniemy przeniesieni do miesca w ktorym bylismy wczensiej,
            // jednak nie uzyskalizmy do niego dostepu ze wzgledu na brak zalogowania

            //tutaj bedziemy definiowali co ma byc wzrocone po poprawnym zalogowaniu
            navigate('/User', { replace: true });


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

    <div className='input-container'>


    <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        
        <h1 style={{ color: 'white' }}>Zaloguj się</h1>

        <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <label htmlFor='email' style={{ color: 'white' }}>Email:</label>
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

            <label htmlFor='password' style={{ color: 'white' }}>Hasło:</label>
            <input 
                type='password'
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />

            <br />

            <button className='btn btn-primary'>Zaloguj się</button>

        </form>

        <p style={{ color: 'white' }}>
            Nie posiadasz konta? <br />
            <span className='line'>
                <Link to="/register">Zarejestruj się</Link>
                {/* tutaj trzeba bedzie odac route */}
                {/* <a href='#'>Zarejestruj się</a> */}
            </span>
        </p>


    </section>

    </div>
  
  )
}
