import { z } from "zod";



export const editClientSchema = z.object({
    id: z.string(),
    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    username: z.string().min(2).max(20),
    active: z.boolean()

})

export type TeditClientSchema = z.infer<typeof editClientSchema>


export const editAdministratorModeratorSchema = z.object({
    id: z.string(),
    username: z.string().min(2).max(20),
    active: z.boolean()

})

export type TeditAdministratorModeratorSchema = z.infer<typeof editAdministratorModeratorSchema>

export const addClientSchema = z.object({

    firstName: z.string().min(2).max(20),
    lastName: z.string().min(2).max(20),
    username: z.string().min(2).max(20),
    active: z.boolean(),
    password: z.string().min(2).max(20)


})

export type TaddClientSchema = z.infer<typeof addClientSchema>

export const addAdministratorModeratorSchema = z.object({

    username: z.string().min(2).max(20),
    active: z.boolean(),
    password: z.string().min(2).max(20)

})

export type TaddAdministratorModeratorSchema = z.infer<typeof addAdministratorModeratorSchema>

export const movieSchema = z.object({

    title: z.string().min(2).max(40),
    cost: z.number().min(0)
})

export type TmovieSchema = z.infer<typeof movieSchema>

export const editMovieSchema = z.object({
    id: z.string(),
    title: z.string().min(2).max(40),
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


export const addRentForMeSchema = z.object({

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

export type TaddRentForMeSchema = z.infer<typeof addRentSchema>

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

