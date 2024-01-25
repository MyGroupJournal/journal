import './App.css';
import {useState} from "react";
import Main from "./Components/Main/Main";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
export default function App() {
    const [loader, setLoader] = useState(true)
    function setLoading(status) {setLoader(status)}
    return (
        <>
            {!loader && <div className="loader"></div>}
            <Header/>
            <Main setLoader={(current) => setLoading(current)}/>
            <Footer/>
        </>
    );
}







