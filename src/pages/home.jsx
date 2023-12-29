import { useState } from 'react'
import AtmCard from '../assects/atmCard.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setUser } from '../services/slice'

function Home() {
    const usersDetails=useSelector(state=>state.usersDetails)
    // console.log(usersDetails);
    const [cardNo,setCardNo]=useState('')
    const [isValidNo,setIsValidNo]=useState(true)
    const history=useHistory()
    const [errorMessage,setErrorMessage]=useState('Invalid card Number')
    const dispatch=useDispatch()

    function changeValue(value)
    {
        if(!/[^0-9]/.test(value))
        {
            setCardNo(value)
        }
    }

    function validate()
    {
        const user=usersDetails.find((user)=>{
            return user.card_no===+cardNo
        })
        if(user)
        {
            if(user.isValid)
            {
                setIsValidNo(true)
                dispatch(setUser({user,isCardInserted:true}))
                history.push('/language')
            }
            else
            {
                setErrorMessage('Account Expired')
                setIsValidNo(false)
            }
        }
        else
        {
            setErrorMessage('Invalid card Number')
            setIsValidNo(false)
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center'> 
                <div className='text-center'>
                    <img src={AtmCard} height={'55%'} alt="" />
                    <p className='text-white fs-4'>Enter your card number</p>
                    <input type="text" value={cardNo} className='cardInput w-50 rounded-pill px-3 text-white fs-5 text-center' maxLength={14} onChange={(e)=>{changeValue(e.target.value)}}/>
                    <p className={`fs-5 error ${isValidNo ? 'invisible': 'visible'}`}>{errorMessage}</p>
                    <div className='d-flex justify-content-center mt-3'>
                        <button className='d-block px-4 py-2 rounded-pill text-white fs-5 button' onClick={()=>{validate()}}>Continue</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home