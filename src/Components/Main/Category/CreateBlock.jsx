import modules from './block.module.css'
import image1 from '../../../assets/img/journal.png'
import image2 from '../../../assets/img/moderate.png'
import image3 from '../../../assets/img/group.png'
export default function CreateBlock({user = 'writer', nextPage, type}){
    return(
        <div onClick={nextPage} className={modules.block}>
            {user === 'writer' ? (
                <>
                    <img className={modules.img} src={image1} alt="Journal"/>
                    <h3 className={modules.blockTitle}>Journal</h3>
                </>
            ): (type === 'first') ?(
                    <>
                        <img className={modules.img} src={image2} alt="Moderate"/>
                        <h3 className={modules.blockTitle}>Moderate</h3>
                    </>
                ) :
                    <>
                        <img className={modules.img} src={image3} alt="Group"/>
                        <h3 className={modules.blockTitle}>Group</h3>
                    </>
            }
        </div>
    )
}