import * as React from 'react';
import Paper from '@mui/material/Paper';
import {amber, deepOrange,  purple} from "@mui/material/colors";
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
    roomId?: string;
}

const initialAppointments: Array<CustomAppointment> = [
    {
        startDate: new Date(),
        endDate: new Date(),
        title: 'Meeting',
        id: "1",
        room: "Sala 1",
    },
    {
        startDate: new Date(),
        endDate: new Date(),
        title: 'Lecture',
        id: "2",
        room: "Sala 1",
    },
];
const resourcesData: Array<Resource> = [
    {
        fieldName: "roomId",
        title: "Sala",
        instances: [
            {
                id: "0",
                text: "Sala 1",
                color: amber,
            },
            // {
            //     id: "1",
            //     text: "Sala 2",
            //     color: deepOrange,
            // },
            // {
            //     id: "2",
            //     text: "Sala 3",
            //     color: purple,
            // },
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
                    startDayHour={20}
                    endDayHour={23}
                />
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
