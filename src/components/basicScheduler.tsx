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
    AppointmentFormProps,
} from '@devexpress/dx-react-scheduler-material-ui';

const appointments: Array<AppointmentModel> = [{
    startDate: '2018-10-31T10:00',
    endDate: '2018-10-31T11:15',
    title: 'Meeting',
    type: 'room',
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
        { id: 'room', text: 'Private', color: '#EC407A' },
        { id: 'room', text: 'asd', color: '#7E57C2' },
    ],
}];

const TextEditor = (props: JSX.IntrinsicAttributes & AppointmentForm.TextEditorProps) => {
    if (props.type === 'multilineTextEditor') {
        return null;
    }

    return <AppointmentForm.TextEditor {...props}/>
};

const BasicLayout: React.FC<AppointmentForm.BasicLayoutProps> = ({ onFieldChange, appointmentData, ...restProps }) => {
    const onCustomFieldChange = (nextValue: any) => {
        onFieldChange({ customField: nextValue });
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <AppointmentForm.Label
                text="Professor"
                type="titleLabel"
            />
            <AppointmentForm.Select
                value={appointmentData.customField}
                onValueChange={onCustomFieldChange}
                placeholder="Gabriel Henrique"
                readOnly={false}
                type={"outlinedSelect"}
            />
            <AppointmentForm.Label
                text="Tablet"
                type="titleLabel"
            />
            <AppointmentForm.Select
                value={appointmentData.customField}
                onValueChange={onCustomFieldChange}
                placeholder="Gabriel Henrique"
                readOnly={false}
                type={"filledSelect"}
            />
            <AppointmentForm.Label
                text="Nome do Aluno"
                type="titleLabel"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.customField}
                onValueChange={onCustomFieldChange}
                placeholder="Gabriel Henrique"
                readOnly={false}
                type={"titleTextEditor"}
            />
        </AppointmentForm.BasicLayout>
    );
};

const Indicator: React.FC<CurrentTimeIndicator.IndicatorProps> = ({ top }) => {
    return (
        <div style={{
            height: '3px',
            width: '100%',
            background: 'red',
            position: 'absolute',
            top: top,
            left: 0,
        }} />
    );
};

const Schedulerr: React.FC = () => {
    const [currentDate, setCurrentDate] = React.useState<SchedulerDateTime>(new Date());

    return (
        <Paper>
            <Scheduler
                data={appointments}

            >
                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={setCurrentDate}
                />

                <DayView/>

                <Appointments/>
                <CurrentTimeIndicator
                    indicatorComponent={Indicator}
                    shadePreviousAppointments={true}
                    shadePreviousCells={true}
                    updateInterval={6000}
                />

                <AppointmentTooltip
                    showCloseButton
                    showDeleteButton
                    showOpenButton
                />
                <AppointmentForm
                    basicLayoutComponent={BasicLayout}
                    textEditorComponent={TextEditor}
                />


                <Resources
                    data={resources}
                />
            </Scheduler>
        </Paper>
    );
};

export default Schedulerr;
