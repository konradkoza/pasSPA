import { FC, useState } from "react";
import { useNavigate } from "react-router-dom"
import { EditModal } from "./FormModal";
import { useForm } from "react-hook-form";
import instance from "../../api/fetcher";

export interface MovieRequest {
    title: string;
    cost: number;
}

export const AddMovieForm: FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const navigation = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
        // getValues,
    } = useForm(
        {
            defaultValues: {
                title: "",
                cost: 0
            },
        }
    )

    const onSubmit = (data: MovieRequest) => {
        instance.post("/movies", {
            title: data.title,
            cost: data.cost
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        }
        );
        reset();
        setIsOpen(false);
        navigation("/movies");

    }


    return (

        <>
            <EditModal isOpen={isOpen} setIsOpen={setIsOpen} buttonText='Add'>
                <h4 className=" text-center">Add movie form</h4>
                <form className="grid grid-cols-2 p-5" onSubmit={handleSubmit(onSubmit)}>

                    <label>Title</label>
                    <input {...register("title")} type="text" />

                    <label>Cost</label>
                    <input {...register("cost")} type="number" />

                    <button type="submit" disabled={isSubmitting} className="col-span-2 bg-blue-500 text-white rounded p-2">Submit</button>
                </form>
            </EditModal>




        </>

    )


}