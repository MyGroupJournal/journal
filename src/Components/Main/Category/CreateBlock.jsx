import modules from './block.module.css'
import image1 from '../../../assets/img/journal.png'
import image2 from '../../../assets/img/moderate.png'
export default function CreateBlock({user = 'writer', nextPage}){
    return(
        <div onClick={nextPage} className={modules.block}>
            {user === 'writer' ? <img className={modules.img} src={image1} alt="Journal"/> : <img className={modules.img} src={image2} alt="Moderate"/>}
            {user === 'writer' ? <h3 className={modules.blockTitle}>Journal</h3> :
                <h3 className={modules.blockTitle}>Moderate</h3>}
        </div>
    )
}