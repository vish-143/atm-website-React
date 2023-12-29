import { useTranslation } from "react-i18next"
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../services/slice";
import { changeLanguage } from "../utilities/changeLanguage";

function Language() {
    const history=useHistory()
    const dispatch=useDispatch()
    const [lang,setLang]=useState('en')

    const { t } = useTranslation();

    const handleChange = (value) => {
        history.push('/options')
        changeLanguage(value)
    };

    function removeCard()
    {
        dispatch(setUser({user:'',isCardInserted:false}))
    }

    return (
        <>
            <button className='px-5 py-2 rounded-pill text-white fs-5 button mt-5 ms-5' onClick={()=>{removeCard()}}>{t("Remove card")}</button>
            <div className="d-flex justify-content-center align-items-center languagePage mt-5">
                <div className="w-75 text-center">
                    <p className="text-white fs-2">{t("select")}</p>
                    <div className='d-flex justify-content-center mt-4 w-100'>
                        <div className="w-75 d-flex gap-5">
                            <button className='px-4 py-2 rounded-pill text-white fs-5 button w-50' onClick={()=>{handleChange('en')}}>{t("English")}</button>
                            <button className='px-4 py-2 rounded-pill text-white fs-5 button w-50' onClick={()=>{handleChange('ta')}}>{t("Tamil")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Language