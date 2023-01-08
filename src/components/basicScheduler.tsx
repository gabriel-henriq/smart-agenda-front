import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    AppointmentModel,
    ViewState,
    SchedulerDateTime,
    CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler';

import {
    Scheduler,
    DayView,
    Appointments,
    Resources,
    AppointmentTooltip,
    AppointmentForm,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';


const Indicator: React.FC<CurrentTimeIndicator.IndicatorProps> = ({ top }) => {
    return (
        <div style={{
            height: '100%',
            width: '2px',
            background: 'red',
            position: 'absolute',
            top: top,
            left: '50%',
            transform: 'translateX(-50%)'
        }} />
    );
};

const appointments: Array<AppointmentModel> = [{
    startDate: '2018-10-31T10:00',
    endDate: '2018-10-31T11:15',
    title: 'Meeting',
    type: 'private',
}, {
    startDate: '2018-10-31T07:30',
    endDate: '2018-10-31T09:00',
    title: 'Go to a gym',
    type: 'room',
}];

const resources = [{
    fieldName: 'type',
    title: 'Type',
    instances: [
        { id: 'private', text: 'Private', color: '#EC407A' },
        { id: 'room', text: 'asd', color: '#7E57C2' },
    ],
}];

const Schedulerr: React.FC = () => {
    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>('2018-10-31T14:15');

    return (
        <Paper>
            <Scheduler
                height={600}
                data={appointments}
            >
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
                <CurrentTimeIndicator
                    indicatorComponent={Indicator}
                    shadePreviousAppointments={true}
                    shadePreviousCells={true}
                    updateInterval={6000}
                />
                <AppointmentForm/>

                <Resources
                    data={resources}
                />
            </Scheduler>
        </Paper>
    );
};

export default Schedulerr;