"use client"

import React, { useRef, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5';
import { PiWarningBold, PiWarningCircleBold } from 'react-icons/pi';

interface Props {
    buttonLabel: string,
    buttonBgColor: string,
    buttonTextColor: string,
    buttonHoverColor: string,
    buttonIcon: JSX.Element,
    buttonPossition: string,
    acceptButton: string,
    cancelButton: string,
    modalLabel: string
    content: string,
    contentAction: () => void
}

export const ActiveWarningModal = ({
    buttonBgColor,
    buttonTextColor,
    buttonLabel,
    buttonHoverColor,
    buttonIcon,
    buttonPossition,
    acceptButton,
    cancelButton,
    content,
    contentAction
}: Props) => {

    const [openModal, setOpenModal] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'new-modal') {
            setOpenModal(!openModal);
        }
    };

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${openModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `relative bg-white rounded-lg overflow-hidden h-full w-full sm:max-w-xs md:max-w-sm xl:max-w-lg sm:h-auto transition-opacity duration-300 ${openModal ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${openModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

    const handleAccept = () => {
        contentAction()
        setOpenModal(!openModal)
    }

    return (
        <div className={`flex ${buttonPossition}`}>
            <button
                onClick={() => setOpenModal(true)}
                className={`${buttonBgColor} ${buttonTextColor} text-sm py-1 px-2 rounded-lg ${buttonHoverColor}`}
            >
                <span className='flex gap-2 p-1'>
                    <p className='text-sm'>{buttonLabel}</p><span className='text-base'>{buttonIcon}</span>
                </span>
            </button>

            <div className={blurEffectClasses}></div>

            <div
                id="new-modal"
                tabIndex={-1}
                aria-hidden={!openModal}
                className={modalClasses}
                onClick={handleOverlayClick}
                ref={modalRef}
            >
                <div className={modalContentClasses}>
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={() => setOpenModal(false)}
                    >
                        <IoCloseSharp />
                    </button>

                    <div className="p-4 md:p-5 text-center">

                        <PiWarningBold className='mx-auto mb-4 w-14 h-14 text-slate-600' />

                        <h3 className="mb-5 text-lg font-semibold text-slate-600 dark:text-gray-400">{content}</h3>
                        <button
                            className="text-white bg-slate-600 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            onClick={handleAccept}
                        >
                            {acceptButton}
                        </button>
                        <button
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                            onClick={() => setOpenModal(false)}
                        >
                            {cancelButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};