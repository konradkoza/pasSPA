import { z } from "zod";



export const editClientSchema = z.object({
    id: z.string(),
    firstName: z.string().min(2).max(20).regex(/^[a-zA-Z]+$/),
    lastName: z.string().min(2).max(20).regex(/^[a-zA-Z]+([ -]{1}[a-zA-Z]+)*$/),
    username: z.string().min(2).max(20).regex(/^[a-zA-Z0-9_]+$/),
    active: z.boolean()

})

export type TeditClientSchema = z.infer<typeof editClientSchema>


export const addClientSchema = z.object({

    firstName: z.string().min(2).max(20).regex(/^[a-zA-Z]+$/),
    lastName: z.string().min(2).max(20).regex(/^[a-zA-Z]+([ -]{1}[a-zA-Z]+)*$/),
    username: z.string().min(2).max(20).regex(/^[a-zA-Z0-9_]+$/),
    active: z.boolean()

})

export type TaddClientSchema = z.infer<typeof addClientSchema>


export const movieSchema = z.object({

    title: z.string().min(2).max(20),
    cost: z.number().min(0)
})

export type TmovieSchema = z.infer<typeof movieSchema>

export const editMovieSchema = z.object({
    id: z.string(),
    title: z.string().min(2).max(20),
    cost: z.number().min(0)
})

export type TeditMovieSchema = z.infer<typeof editMovieSchema>


export const addRentSchema = z.object({

    clientId: z.string(),
    movieId: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable()
}).refine(data => {
    if (data.endDate == null || data.endDate == "") {
        return true;
    } else {
        return new Date(data.startDate) <= new Date(data.endDate);
    }

}, {
    message: "End date must be after start date",
    path: ["endDate"]

}).refine(data => {
    if (data.endDate == "") {
        return true;
    } else {
        return new Date(data.startDate) >= new Date(new Date().setHours(0, 0, 0, 0));
    }
}, {
    message: "Start date can't be in the past",
    path: ["startDate"]
});

export type TaddRentSchema = z.infer<typeof addRentSchema>

export const endRentSchema = z.object({
    id: z.string(),
    endDate: z.string()
}).refine(data => {
    return new Date(data.endDate) >= new Date(new Date().setHours(0, 0, 0, 0));
}, {
    message: "End date can't be in the past",
    path: ["endDate"]
});

export type TendRentSchema = z.infer<typeof endRentSchema>

