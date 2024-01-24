import modules from "./category.module.css";
import CreateBlock from "./CreateBlock";

export default function Category({user, nextPage}) {
    return (
        <div className={modules.variantsBlock}>
            <div className={modules.variants} style={{width: user === 'admin' ? '100%' : ''}}>
                <CreateBlock nextPage={nextPage}/>
                {user === 'admin' && <CreateBlock nextPage={nextPage} user={user}/>}
            </div>
        </div>
    )
}