import modules from "./loginPage.module.css";

export default function LoginPage({passwordEnter, textEnter, text, password, handle}){
    return(
        <div className={modules.loginPage}>
            <div className={modules.loginForm}>
                <h1 className={modules.form__text}>Login</h1>
                <form onSubmit={handle} className={modules.forma + ' forma'}>
                    <input type="text" value={text} placeholder='Name...' required
                           onChange={textEnter}/>
                    <input type="password" value={password} placeholder='Password...' required
                           onChange={passwordEnter}/>
                    <button className={modules.butt__subm}>Login</button>
                </form>
            </div>
        </div>
    )
}