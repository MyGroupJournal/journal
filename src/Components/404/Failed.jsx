import modules from './failed.module.css'
import image from '../../assets/img/404.png'

export default function Failed(){
    return (
        <div className={modules.error}>
            <img src={image} className={modules.error__img} alt="ERROR"/>
        </div>
    )
}