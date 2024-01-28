import {useState} from "react";
import LoginPage from "./LoginPage";
import {decryptText} from "../../cryptoUtilt";
import axios from "axios";
export default function Login({setLoading, pageSet, setUser}){
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');

    function textEnter(e){setText(e.target.value)}
    function passwordEnter(e){setPassword(e.target.value)}
    function handleVerify(e){
        e.preventDefault();
        e.stopPropagation();
        verifying()
        setLoading(false)
    }
    function verifying() {
        axios.get('https://65b0e904d16d31d11bdd8e89.mockapi.io/journalAPI/secureData')
            .then(res => {
                setLoading(true)
                if (Object.keys(res.data[0]).filter(key => key === text)[0]){
                    if (Boolean(res)) {
                        const decrypted = decryptText(res.data[0][text], '9857bc14-eb97-4fd4-9a40-34b073184545');
                        if(decrypted === password) {
                            pageSet('main')
                            setUser(text)
                        }
                    } else return false
                }
                setPassword('')
            })
    }

    return(
        <>
            <LoginPage passwordEnter={passwordEnter} textEnter={textEnter} password={password} text={text} handle={handleVerify}/>
        </>
    )
}