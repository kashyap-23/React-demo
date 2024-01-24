import React from 'react'

function Model({ isVisible, onClose, children }) {

    if (!isVisible) return null;

    const handleClose = (e) => {
        if (e.target.id === "wrapper") onClose();
    }

    return (
        <div onClick={handleClose} id="wrapper" className='fixed inset-0  bg-black bg-opacity-25 backdrop-blur[5px] flex justify-center items-center '>
            <div className='w-[800px] flex rounded-lg flex-col'>
                <div className='bg-white p-2 rounded-xl flex  flex-col'>
                    <button className='text-white text-xl  text-end px-3 py-2' onClick={() => onClose()}><i class="fa fa-times" style={{ fontSize: "30px", color: "black" }}></i>
                    </button><div className='px-8'>
                        {children}</div>
                </div>
            </div>
        </div>
    )
}

export default Model