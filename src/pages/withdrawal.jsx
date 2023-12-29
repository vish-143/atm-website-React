import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setResult, withdrawal } from "../services/slice"
import { useTranslation } from 'react-i18next';

function Withdrawal() {
    const [amount,setAmount]=useState('')
    const [pin,setPin]=useState('')
    const [amountError,setAmountError]=useState('')
    const [pinError, setPinError]=useState('')
    const user=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const history=useHistory()
    const usersDetails=useSelector(state=>state.usersDetails)
    const { t } = useTranslation();

    function changeAmount(value)
    {
        if(!/[^0-9]/.test(value))
        {
            setAmount(value)
        }
    }

    function changePin(value)
    {
        if(!/[^0-9]/.test(value))
        {
            setPin(value)
        }
    }

    function validation()
    {
        let error=false

        if(+amount<100 || +amount>20000)
        {
            setAmountError('Amount should between 100 to 20000')
            error=true
        }
        else if(+amount%100)
        {
            setAmountError('Amount should be multiple of 100')
            error=true
        }
        else
        {
            setAmountError('')
        }

        if(+pin!==user.pin)
        {
            setPinError('Incorrect Pin')
            error=true
        }
        else
        {
            setPinError('')
        }

        if(!error)
        {
            if(+amount<user.availableBalance)
            {
                const index=usersDetails.findIndex(obj=>{
                    return obj.pin===user.pin
                })
                dispatch(withdrawal({amount:+amount, index}))
                dispatch(setResult('Cash withdrawal successfull'))
                history.push('/successPage')
            }
            else
            {
                dispatch(setResult('Insuficient balance'))
                history.push('/failurePage')
            }
        }
    }

    return (
        <>
            <Link to='/options'><button className='px-5 py-2 rounded-pill text-white fs-5 button mt-5 ms-5'>{t('Back')}</button></Link>
            <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="w-75 text-center">
                    <p className="text-white fs-2">{t('Cash Withdrawal')}</p>
                    <div className='d-flex justify-content-center mt-4 w-100'>
                        <div className="w-75 d-flex justify-content-between">
                            <div className="w-50">
                                <p className='text-white fs-4 my-3'>{t('Enter your withdrawal amount')}</p>
                                <input type="text" value={amount} className='cardInput w-50 rounded-pill px-3 text-white fs-5 text-center' maxLength={5} onChange={(e)=>{changeAmount(e.target.value)}} />
                                <p className='fs-5 error'>{t(`${amountError}`)}</p>
                            </div>
                            <div className="w-50">
                                <p className='text-white fs-4 my-3'>{t('Enter your pin number')}</p>
                                <input type="text" value={pin} className='cardInput w-50 rounded-pill px-3 text-white fs-5 text-center' maxLength={4} onChange={(e)=>{changePin(e.target.value)}} />
                                <p className='fs-5 error'>{t(`${pinError}`)}</p>
                            </div>
                        </div>
                    </div>
                    <button className='px-4 py-2 rounded-pill text-white fs-5 button my-3' onClick={()=>{validation()}}>{t('Withdraw')}</button>
                </div>
            </div>
        </>
    )
}
export default Withdrawal