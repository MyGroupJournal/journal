import './createBlock.css'
import image1 from '../../../../../../assets/img/journal.png'
import image2 from '../../../../../../assets/img/moderate.png'
import image3 from '../../../../../../assets/img/group.png'
import image4 from '../../../../../../assets/img/data-analytics.png'
import image5 from '../../../../../../assets/img/edit.png'

export default function CreateBlock({level = 3, ThirdLevelRender = 0, nextPage, FirstLevelRender = 0}) {
    return (
        <div onClick={nextPage} className={'block'}>
            {level === 3 ? (
                (ThirdLevelRender) ?
                    <>
                        <img className={'block__img'} src={image1} alt="JournalMore"/>
                        <h3 className={'block__blockTitle'}>Journal</h3>
                    </> :
                    <>
                        <img className={'block__img'} src={image3} alt="Group"/>
                        <h3 className={'block__blockTitle'}>Group</h3>
                    </>
            ) : (level === 2) ? (
                <>
                    <img className={'block__img'} src={image2} alt="Moderate"/>
                    <h3 className={'block__blockTitle'}>Moderate</h3>
                </>
            ) : (level === 1) && (
                (FirstLevelRender) ?
                    <>
                        <img className={'block__img'} src={image4} alt="Analytic"/>
                        <h3 className={'block__blockTitle'}>Analytic</h3>
                    </> :
                    <>
                        <img className={'block__img'} src={image5} alt="Edit"/>
                        <h3 className={'block__blockTitle'}>Edit</h3>
                    </>
            )

            }
        </div>
    )
}

