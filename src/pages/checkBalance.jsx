import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setResult } from '../services/slice'
import { useTranslation } from 'react-i18next';

function CheckBalance() {
    const history = useHistory()
    const [pin, setPin] = useState('')
    const [isValidNo, setIsValidNo] = useState(true)
    const user = useSelector(state => state.user)
    const dispatch=useDispatch()

    const { t } = useTranslation();

    function changeValue(value) {
        if (!/[^0-9]/.test(value)) {
            setPin(value)
        }
    }

    function validate() {
        if (user.pin===+pin) {
            setIsValidNo(true)
            dispatch(setResult('Check balance successfull'))
            history.push('/successPage')
        }
        else {
            setIsValidNo(false)
        }
    }

    return (
        <>
            <Link to='/options'><button className='px-5 py-2 rounded-pill text-white fs-5 button mt-5 ms-5'>{t("Back")}</button></Link>
            <div className='d-flex justify-content-center mt-5'>
                <div className='text-center'>
                    <p className='text-white fs-2'>{t('Check Balance')}</p>
                    <p className='text-white fs-4'>{t('Enter your pin number')}</p>
                    <input type="text" value={pin} className='cardInput w-50 rounded-pill px-3 text-white fs-5 text-center' maxLength={4} onChange={(e) => { changeValue(e.target.value) }} />
                    <p className={`fs-5 error ${isValidNo ? 'invisible' : 'visible'}`}>{t('Incorrect Pin')}</p>
                    <div className='d-flex justify-content-center mt-3'>
                        <button className='d-block px-5 py-2 rounded-pill text-white fs-5 button' onClick={() => { validate() }}>{t("Check")}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CheckBalance