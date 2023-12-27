import { FC } from 'react'
import { Dialog } from '@headlessui/react'


type Props = {

    children: JSX.Element | JSX.Element[] | string | string[]
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    buttonText: string
}


export const EditModal: FC<Props> = ({ children, isOpen, setIsOpen, buttonText }) => {



    return (
        <>
            <button className='btn-edit' onClick={() => setIsOpen(true)}>{buttonText}</button>
            <Dialog
                about="div"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50 "
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
                <div className="fixed inset-0 flex w-screen items-center justify-center">
                    <Dialog.Panel className=" w-3/4 min-w-fit h-fit rounded bg-white p-4">

                        {children}
                    </Dialog.Panel>

                </div>

            </Dialog>

        </>


    )


}