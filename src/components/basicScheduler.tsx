import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    ViewState,
    SchedulerDateTime,
} from '@devexpress/dx-react-scheduler';

import {
    CurrentTimeIndicator,
    Scheduler,
    DayView,
    Appointments,
    Resources,
    AppointmentTooltip,
    AppointmentForm, WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';
import {appointments, resourcesData} from "../data/data";

const TextEditor = (props: JSX.IntrinsicAttributes & AppointmentForm.TextEditorProps) => {
    if (props.type === 'multilineTextEditor') {
        return null;
    }

    return <AppointmentForm.TextEditor {...props}/>
};

const BasicTextEditorComponent: React.FC<AppointmentForm.TextEditorProps> = ({
    value,
    type,
...restProps}) => {

    return (
        <AppointmentForm.TextEditor
            value={"Title"}
            type={"titleTextEditor"}
            className={"title"}
            {...restProps}
        >
        </AppointmentForm.TextEditor>
    )
}

const BasicLayoutComponent: React.FC<AppointmentForm.BasicLayoutProps> = ({
    onFieldChange,
    appointmentData,
    ...restProps}) => {
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
                text="Nome do Aluno"
                type="titleLabel"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.customField}
                onValueChange={onCustomFieldChange}
                readOnly={false}
                placeholder="Gabriel Henrique"
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

                <WeekView/>

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
                    textEditorComponent={BasicTextEditorComponent}
                    // basicLayoutComponent={BasicLayoutComponent}
                />


                <Resources
                    data={resourcesData}
                />
            </Scheduler>
        </Paper>
    );
};

export default Schedulerr;
