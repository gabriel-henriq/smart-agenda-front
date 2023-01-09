import * as React from 'react';
import Paper from '@mui/material/Paper';
import {amber, deepOrange, pink, purple, teal} from "@mui/material/colors";
import {AppointmentModel, ChangeSet,  SchedulerDateTime, Resource, EditingState, ViewState} from '@devexpress/dx-react-scheduler';

import {
    AppointmentForm,
    Appointments,
    AppointmentTooltip,
    DayView,
    DragDropProvider,
    EditRecurrenceMenu,
    CurrentTimeIndicator,
    Resources,
    Scheduler,
} from '@devexpress/dx-react-scheduler-material-ui';

interface CustomAppointment extends AppointmentModel {
    roomId?: number;
}

const initialAppointments: Array<CustomAppointment> = [
    {
        startDate: new Date(),
        endDate: new Date(),
        title: 'Meeting',
        id: 1,
        roomId: 1,
    },
    {
        startDate: new Date(),
        endDate: new Date(),
        title: 'Lecture',
        id: 2,
        roomId: 2,
    },
];

const resourcesData: Resource[] = [
    {
        fieldName: "roomId",
        title: "Room",
        allowMultiple: true,
        instances: [
            {
                text: 'Room 101',
                id: 1,
                color: amber,
            }, {
                text: 'Room 102',
                id: 2,
                color: pink,
            }, {
                text: 'Room 103',
                id: 3,
                color: purple,
            }, {
                text: 'Meeting room',
                id: 4,
                color: deepOrange,
            }, {
                text: 'Conference hall',
                id: 5,
                color: teal,
            },
        ],
    },
];


const Schedulerr: React.FC = () => {
    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(new Date());
    const [appointments, setAppointments] = React.useState<Array<CustomAppointment>>(initialAppointments);
    const [editingAppointment, setEditingAppointment] = React.useState<Partial<CustomAppointment>>();

    const handleEditingAppointmentChange = (appointment: Partial<CustomAppointment>) => {
        setEditingAppointment(appointment);
    };

    const handleCommitChanges = (changes: ChangeSet) => {
        if (changes.added) {
            // Create a new appointment
            const newAppointment = changes.added as CustomAppointment;
            newAppointment.id = Date.now();
            setAppointments([...appointments, newAppointment]);
        }

        if (changes.changed) {
            // Update an existing appointment
            const changedAppointmentId = Object.keys(changes.changed)[0];
            const changedAppointment = changes.changed[changedAppointmentId];
            const updatedAppointments = appointments.map((appointment) => {
                if (appointment.id?.toString() === changedAppointmentId) {
                    return { ...appointment, ...changedAppointment };
                }
                return appointment;
            });
            setAppointments(updatedAppointments);
        }

        if (changes.deleted) {
            // Delete an appointment
            const deletedAppointmentId = changes.deleted;
            const updatedAppointments = appointments.filter(
                (appointment) => appointment.id !== deletedAppointmentId
            );
            setAppointments(updatedAppointments);
        }
    };

    return (
        <Paper>
            <Scheduler
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
                <DayView
                    startDayHour={15}
                    endDayHour={23}
                />
                <Appointments/>
                <AppointmentTooltip
                    showCloseButton
                    showDeleteButton
                    showOpenButton
                />


                <AppointmentForm/>


                <DragDropProvider />
                <CurrentTimeIndicator
                    updateInterval={6000}
                />
                <Resources data={resourcesData} mainResourceName={"roomId"}/>
            </Scheduler>
        </Paper>
    );
};

export default Schedulerr;
