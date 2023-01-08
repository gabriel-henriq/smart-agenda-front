import * as React from 'react';
import Paper from '@mui/material/Paper';
import {amber, deepOrange,  purple} from "@mui/material/colors";
import {AppointmentModel, ChangeSet, EditingState, SchedulerDateTime, ViewState,Resource} from '@devexpress/dx-react-scheduler';

import {
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    DayView,
    CurrentTimeIndicator,
    Resources,
    Scheduler, DragDropProvider, EditRecurrenceMenu,
} from '@devexpress/dx-react-scheduler-material-ui';

interface CustomAppointment extends AppointmentModel {
    id: number | string;
    roomId: number;
    professorId: number;
    tabletId: number;
    student: string;
}

const initialAppointments: Array<CustomAppointment> = [
    {
        startDate: new Date(),
        endDate: new Date(),
        title: 'Meeting',
        id: 1,
        roomId: 1,
        professorId: 1,
        tabletId: 1,
        student: 'Student 1',
    },
    {
        startDate: new Date(),
        endDate: new Date(),
        title: 'Lecture',
        id: 2,
        roomId: 2,
        professorId: 2,
        tabletId: 2,
        student: 'Student 2',
    },
];
const resourcesData: Array<Resource> = [
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

const Schedulerr: React.FC = () => {
    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(new Date());
    const [appointments, setAppointments] = React.useState<CustomAppointment[]>(initialAppointments);
    const [editingAppointment, setEditingAppointment] = React.useState<Partial<AppointmentModel>>();

    const handleEditingAppointmentChange = (appointment: Partial<AppointmentModel>) => {
        setEditingAppointment(appointment);
    };

    const handleCommitChanges = (changes: ChangeSet) => {
        if (changes.added) {
            // Create a new appointment
            const newAppointment = changes.added[0];
            appointments.push(newAppointment);
        }
        if (changes.changed) {
            // Update an existing appointment
            const changedAppointmentId = Object.keys(changes.changed)[0];
            const changedAppointment = changes.changed[changedAppointmentId];
            const updatedAppointments = appointments.map((appointment) => {
                if (appointment.id === changedAppointmentId) {
                    return { ...appointment, ...changedAppointment };
                }
                return appointment;
            });
            setAppointments(updatedAppointments);
        }
        try {
            if (changes.deleted) {
                // Delete an appointment
                const deletedAppointmentId = changes.deleted;
                const updatedAppointments = appointments.filter(
                    (appointment) => appointment.id !== deletedAppointmentId
                );
                setAppointments(updatedAppointments);
            }
        } catch (err) {
            console.log(err)
        }

    };



    return (
        <Paper>
            <Scheduler
                height={600}
                data={appointments}
            >
                <EditingState
                    editingAppointment={editingAppointment}
                    onEditingAppointmentChange={handleEditingAppointmentChange}
                    onCommitChanges={handleCommitChanges}
                />
                <EditRecurrenceMenu />
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={setCurrentDate}
                />
                <DayView/>
                <Appointments/>
                <AppointmentTooltip
                    showCloseButton
                    showDeleteButton
                    showOpenButton
                />
                <AppointmentForm/>

                <Resources data={resourcesData}/>
                <DragDropProvider />
                <CurrentTimeIndicator
                    updateInterval={6000}
                />
            </Scheduler>
        </Paper>
    );
};

export default Schedulerr;
