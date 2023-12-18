import { FC } from 'react'
import { Dialog } from '@headlessui/react'


type Props = {

    children: JSX.Element | JSX.Element[] | string | string[]
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    buttonText: string
}


export const EditModal: FC<Props> = ({ children, isOpen, setIsOpen, buttonText }) => {
    // const [isModalOpen, setIsOpen] = useState(isOpen)



    return (
        <>
            <button className=' text-white bg-blue-600 w-20 rounded-sm ml-2 my-2' onClick={() => setIsOpen(true)}>{buttonText}</button>
            <Dialog
                about="div"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50 "
            >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true"></div>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto w-3/4 min-w-fit h-fit rounded bg-white">

                        {children}
                    </Dialog.Panel>

                </div>

            </Dialog>

        </>


    )


}