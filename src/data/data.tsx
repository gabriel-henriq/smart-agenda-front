import {amber, deepOrange, pink, purple, teal} from "@mui/material/colors";
import {AppointmentModel, Resource} from "@devexpress/dx-react-scheduler";

interface CustomAppointment extends AppointmentModel {
    roomId: number;
    professorId: number;
    tabletId: number;
    student: string;
}

export const appointments: Array<CustomAppointment> = [
    {
        startDate: new Date(),
        endDate: new Date(),
        title: 'Meeting',
        roomId: 1,
        professorId: 1,
        tabletId: 1,
        student: 'Student 1',
    },
    {
        startDate: new Date(),
        endDate: new Date(),
        title: 'Lecture',
        roomId: 2,
        professorId: 2,
        tabletId: 2,
        student: 'Student 2',
    },
];

export const resourcesData: Array<Resource> = [
    {
        fieldName: "roomId",
        title: "Sala",
        instances: [
            {
                id: 1,
                text: "Sala 1",
                color: amber
            },
            {
                id: 2,
                text: "Sala 2",
                color: deepOrange
            },
            {
                id: 3,
                text: "Sala 3",
                color: purple
            },
        ]
    },
    {
        fieldName: "professorId",
        title: "Professor",
        instances: [
            {
                id: 1,
                text: "Daniele",
                color: amber
            },
            {
                id: 2,
                text: "Alberto",
                color: deepOrange
            },
            {
                id: 3,
                text: "Lucas",
                color: purple
            },
        ]
    },
    {
        fieldName: "tabletId",
        title: "Tablet",
        instances: [
            {
                id: 1,
                text: "Tablet 1",
                color: amber
            },
            {
                id: 2,
                text: "Tablet 2",
                color: deepOrange
            },
            {
                id: 3,
                text: "Tablet 3",
                color: purple
            },
        ]
    },
];