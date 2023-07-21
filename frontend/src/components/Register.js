import { useRef, useState, useEffect, isValidElement } from "react";
import { faCheck, faTimes, faInfoCircle, faUsersRectangle, faL, faCediSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react'
import { isValidInputTimeValue, setSelectionRange } from "@testing-library/user-event/dist/utils";
import axios from "../api/axios";

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|pl)$/i;
const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "/auth/register";



export default function Register() {


    // FIRSTNAME
    const[firstname, setFirstName] = useState('');


    // LASTANAME
    const[lastname, setLastName] = useState('');


    // EMAIL
    const emailRef = useRef();
    const errRef = useRef();
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false); //sprawdzenie czy email jest sotepny
    const [emailFocus, setEmailFocus] = useState(false); 


    // PASSWORD
    const[password, setpassword] = useState('');
    const[validpassword, setValidpassword] = useState(false);
    const[passwordFocus, setpasswordFocus] = useState(false);
    const[matchpassword, setMatchpassword] = useState('');
    
    const[validMatch, setValidMatch] = useState(false);
    const[matchFocus, setMatchFocus] = useState(false);


    const[errMsg, setErrMsg] = useState('');
    const[success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();


    }, [])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);

    }, [email])


    //useEffect for password

    useEffect(() => {
        const result = password_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidpassword(result);
        const match = password == matchpassword;
        setValidMatch(match);
    }, [password, matchpassword])
    

    //use effect dla bledow

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchpassword])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // some extra validation
        const v1 = EMAIL_REGEX.test(email);
        const v2 = password_REGEX.test(password);
        if(!v1 || !v1){
            setErrMsg("Niepoprawne dane")
            return;
        }

        // setSuccess(true);

        try{
            // przeslanie requesta do backendu
            const response = await axios.post(REGISTER_URL, 
                JSON.stringify({firstname, lastname, email, password}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    // withCredentials: true
                }
            );

            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(true);

            //clear input fields from registration form - we might do it
        }catch (err){

            if(!err?.response) {
                setErrMsg("Brak odpowiedzi serwera");
            
            }else if (err.response?.status == 400){
                setErrMsg("Email zajęty")
            }else{
                setErrMsg("Rejestracja nie powiodla sie")
            }

            errRef.current.focus();

        }
    }



  return (

    <div className='input-container'>

    <>
    {success ? (
        <section>

   
        <h1>Sukces!</h1>
        <p>
            <a href="#">Zaloguj się</a>
        </p>
        </section>
    ) : (
    <section>

        {/* bedzie wyswietlany na gorze strony */}
        <p ref={errRef} className={errMsg ? "errmsg" : 
        "offscreen"} aria-live="assetive" > {errMsg} </p>

        <h1>Rejestracja</h1>
        <form onSubmit={handleSubmit}>

            {/* FIRSTNAME */}

            <label htmlFor="firstname">
                Imie:
                
                {/* <span className={validEmail ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span> */}

                {/* <span className={validEmail || !email ? "hide" : "invalid"} >
                    <FontAwesomeIcon icon={faTimes} />
                </span> */}
                
            </label>


            <input
        
                type="text"
                id="firstname"
                // ref={emailRef}
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                required
                // aria-invalid={validEmail ? "false" : "true"} //if falidation passed, "true" is set
                // aria-describedby="uidnote"
                // onFocus={() => setEmailFocus(true)}
                // onBlur={() => setEmailFocus(false)} //when ew leafe that filed
            
            />

            {/* LASTNAME */}

            <label htmlFor="lastname">
                Nazwisko:
                
                {/* <span className={validEmail ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span> */}

                {/* <span className={validEmail || !email ? "hide" : "invalid"} >
                    <FontAwesomeIcon icon={faTimes} />
                </span> */}
                
            </label>


            <input
        
                type="text"
                id="lastname"
                // ref={emailRef}
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
                required
                // aria-invalid={validEmail ? "false" : "true"} //if falidation passed, "true" is set
                // aria-describedby="uidnote"
                // onFocus={() => setEmailFocus(true)}
                // onBlur={() => setEmailFocus(false)} //when ew leafe that filed
            
            />


            {/* EMAIL */}

            <label htmlFor="email">
                Email:
                
                <span className={validEmail ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>

                <span className={validEmail || !email ? "hide" : "invalid"} >
                    <FontAwesomeIcon icon={faTimes} />
                </span>
                
            </label>

            <input
        
                type="text"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={validEmail ? "false" : "true"} //if falidation passed, "true" is set
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)} //when ew leafe that filed
                
            />

            <p id="uidnote" className={emailFocus && email && !validEmail ? "sugestie" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters. <br />
                Musi zaczynac sie od litery. <br />
                Litera, liczba, podkreselnie.
            </p>

            {/* PASSWORD */}



            <label htmlFor="password">
                Hasło:
                <span className = {validpassword ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>

                <span className={validpassword || password ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>

            <input
                type="password"
                id="password"
                onChange={(e) => setpassword(e.target.value)}
                required
                aria-invalid={validpassword ? "false" : "true"}
                aria-describedby="passwordnote"
                onFocus={() => setpasswordFocus(true)}
                onBlur={() => setpasswordFocus(false)}
            />

            <p id="passwordnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 do 24 znakow. <br />
                Musi zawieraz duze oraz małe litery, liczbe oraz znak zpecjalny. <br />
                Dozwolone znaki specjalne: <span asia-label="exclamation mark">!</span>
                
                <span aria-label="at sybol">@</span> <span aria-label="hashtag">#</span>
                <span aria-label ="dolar sign">$</span>
                <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_password">
                Potwierdź hasło:
                <span className={validMatch && matchpassword ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />

                </span>

                <span className={validMatch || !matchpassword ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                </span>
            </label>

            <input
                type="password"
                id="confirm_password"
                onChange={(e) => setMatchpassword(e.target.value)}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
            />

            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Hasla musza sie zgadzac
            </p>

            <button disabled={!validEmail || !validpassword || !validMatch ? true : false}>
                Zarejestruj sie
            </button>
            
        </form>

        <p>
            Posiadasz juz konto? <br />
            <span className="line">
                {/* potem trzeba odac tutaj opowiendni rout */}


                <a href="#">Zaloguj się</a>
            </span>
        </p>

    </section>
    )}
    </>

    </div>
  )
}




