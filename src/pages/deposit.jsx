import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setResult, deposit } from "../services/slice"
import { useTranslation } from 'react-i18next';

function Deposit() {
    const [count500, setCount500] = useState('')
    const [count200, setCount200] = useState('')
    const [count100, setCount100] = useState('')
    const history = useHistory()
    const [pageNo, setPageNo] = useState(1)
    const [pinError, setPinError] = useState(false)
    const [totalAmount, setTotalAmount] = useState(0)
    const [pin, setPin] = useState('')
    const userPin = useSelector(state => state.user.pin)
    const dispatch = useDispatch()
    const usersDetails = useSelector(state => state.usersDetails)
    const [amountError, setAmountError] = useState(false)
    const { t } = useTranslation();

    function changecount500(value) {
        if (!/[^0-9]/.test(value)) {
            setCount500(value)
        }
    }
    function changecount200(value) {
        if (!/[^0-9]/.test(value)) {
            setCount200(value)
        }
    }
    function changecount100(value) {
        if (!/[^0-9]/.test(value)) {
            setCount100(value)
        }
    }

    function addAmount() {
        const totalAmount = (500 * +count500) + (200 * +count200) + (100 * +count100)
        setTotalAmount(totalAmount)
        if (totalAmount) {
            setAmountError(false)
            setPageNo(2)
        }
        else {
            setAmountError(true)
        }
    }

    function changePin(value) {
        if (!/[^0-9]/.test(value)) {
            setPin(value)
        }
    }

    function validation() {
        if (userPin === +pin) {
            const index = usersDetails.findIndex(obj => {
                return obj.pin === userPin
            })
            dispatch(deposit({ amount: +totalAmount, index }))
            dispatch(setResult('Cash deposited successfully'))
            history.push('/successPage')
        }
        else {
            setPinError(true)
        }
    }

    return (
        <>
            {pageNo === 1 ?
                <>
                    <Link to='/options'><button className='px-5 py-2 rounded-pill text-white fs-5 button mt-5 ms-5'>{t('Back')}</button></Link>
                    <div className='d-flex justify-content-center mt-5'>
                        <div className='text-center'>
                            <p className='text-white fs-2'>{t('Cash Deposit')}</p>
                            <div>
                                <p className='text-white fs-3'>{t('Enter your deposit amount')}</p>
                            </div>
                            <div className="d-flex">
                                <div>
                                    <p className='text-white fs-4'>500 x</p>
                                    <input type="text" value={count500} className='cardInput w-75 rounded-pill px-3 text-white fs-5 text-center' onChange={(e) => { changecount500(e.target.value) }} />
                                </div>
                                <div>
                                    <p className='text-white fs-4'>200 x</p>
                                    <input type="text" value={count200} className='cardInput w-75 rounded-pill px-3 text-white fs-5 text-center' onChange={(e) => { changecount200(e.target.value) }} />
                                </div>
                                <div>
                                    <p className='text-white fs-4'>100 x</p>
                                    <input type="text" value={count100} className='cardInput w-75 rounded-pill px-3 text-white fs-5 text-center' onChange={(e) => { changecount100(e.target.value) }} />
                                </div>
                            </div>
                            <p className={`fs-5 error mt-3 ${amountError ? 'visible' : 'invisible'}`}>{t('Enter amount to deposit')}</p>
                            <div className='d-flex justify-content-center mt-4'>
                                <button className='d-block px-5 py-2 rounded-pill text-white fs-5 button' onClick={() => { addAmount() }}>{t('Deposit')}</button>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    <button className='px-5 py-2 rounded-pill text-white fs-5 button mt-5 ms-5' onClick={() => { setPageNo(1) }}>{t('Back')}</button>
                    <div className='d-flex justify-content-center mt-5'>
                        <div className='text-center'>
                            <p className='text-white fs-2'>{t('Cash Deposit')}</p>
                            <p className='text-white fs-3'>{t('Deposit amount:')} {totalAmount}</p>
                            <p className='text-white fs-4'>{t('Enter your pin number')}</p>
                            <input type="text" value={pin} className='cardInput rounded-pill px-3 text-white fs-5 text-center' maxLength={4} onChange={(e) => { changePin(e.target.value) }} />
                            <p className={`fs-5 error ${pinError ? 'visible' : 'invisible'}`}>{t('Incorrect Pin')}</p>
                            <div className='d-flex justify-content-center mt-3'>
                                <button className='d-block px-5 py-2 rounded-pill text-white fs-5 button' onClick={() => { validation() }}>{t('Deposit')}</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
export default Deposit