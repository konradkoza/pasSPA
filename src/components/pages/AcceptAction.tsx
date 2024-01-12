import { FC, useState } from "react";
import { EditModal } from "./FormModal";


export const AcceptAction: FC<{ action: () => void }> = ({ action }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Delete'>
                <h4 className="font-semibold text-center">Action cannot be undone!</h4>
                <div className="flex flex-col items-center p-2">
                    <p className="mb-2">Are you sure you want to continue?</p>
                    <div className="flex justify-around gap-3">
                        <button className="btn-delete" onClick={() => { action(); setIsOpen(false) }}>Accept</button>
                        <button className="btn-edit" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </EditModal>


        </>

    )
}