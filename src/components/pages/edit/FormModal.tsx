import { FC, useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'


type Props = {

    children: JSX.Element | JSX.Element[] | string | string[]
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}


export const EditModal: FC<Props> = ({ children, isOpen, setIsOpen }) => {
    // const [isModalOpen, setIsOpen] = useState(isOpen)



    return (
        <>
            <button onClick={() => setIsOpen(true)}>Edit</button>
            <Dialog
                about="div"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50 "
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto w-3/4 h-fit rounded bg-white">

                        {children}
                    </Dialog.Panel>

                </div>

            </Dialog>

        </>


    )


}