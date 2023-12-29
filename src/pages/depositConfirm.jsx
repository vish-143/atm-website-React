function DepositConfirm() {
    return(
        <>
            <button className='px-5 py-2 rounded-pill text-white fs-5 button mt-5 ms-5'>Back</button>
            <div className='d-flex justify-content-center mt-5'>
                <div className='text-center'>
                    <p className='text-white fs-2'>Cash Deposit</p>
                    <p className='text-white fs-3'>Deposit amount: {'100'}</p>
                    <p className='text-white fs-4'>Enter your pin number</p>
                    <input type="text" className='cardInput rounded-pill px-3 text-white fs-5 text-center' maxLength={4} />
                    <p className='fs-5 error'>Incorrect Pin</p>
                    <div className='d-flex justify-content-center mt-3'>
                        <button className='d-block px-5 py-2 rounded-pill text-white fs-5 button'>Deposit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DepositConfirm