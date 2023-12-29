import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

function ResultPage(props) {
    const balance=useSelector(state=>state.user.availableBalance)
    const result=useSelector(state=>state.result)

    const { t } = useTranslation();

    return (
        <>
            <div className="d-flex justify-content-center">
                <div className=" text-center">
                    <i class={`${props.emoji} icon`}></i>
                    <p className="text-white fs-3">{t('Available balance',{balance:balance})}</p>
                    <p className="text-white fs-4">{t(`${result}`)}</p>
                    <div className="d-flex justify-content-center mt-5">
                        <Link to='/options' className='link-color'><button className='d-block px-4 py-2 rounded-pill text-white fs-5 button'>{t('Go back to home')}</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResultPage