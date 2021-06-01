import React from 'react';
import './style.css';
import { Calendar, Views } from 'react-big-calendar';
import events from './events';
import { localizer, resourceMap } from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import moment from 'moment';
import {
    Dialog,
    TextField,
    Button,
    DialogContent,
    DialogActions,
    DialogTitle,
    withStyles,
    InputLabel, Select
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

const DragAndDropCalendar = withDragAndDrop(Calendar);

const useStyles = (theme) => ({});

const propTypes = {};

class CalendarView extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            events: events,
            title: '',
            start: '',
            end: '',
            desc: '',
            resourceId: 1,
            openSlot: false,
            openEvent: false,
            clickedEvent: {},
            resourceMap: resourceMap,
            displayDragItemInCell: true,
        };
        this.handleClose = this.handleClose.bind(this);
        this.newEvent = this.newEvent.bind(this);
        this.moveEvent = this.moveEvent.bind(this);
    }

    handleClose() {
        this.setState({ openEvent: false, openSlot: false });
    }

    handleSlotSelected(slotInfo) {
        this.setState({
            title: '',
            desc: '',
            resourceId: slotInfo.resourceId,
            start: slotInfo.start,
            end: slotInfo.end,
            openSlot: true
        });
    }

    handleEventSelected(event) {
        this.setState({
            openEvent: true,
            clickedEvent: event,
            start: event.start,
            end: event.end,
            resourceId: event.resourceId,
            title: event.title,
            desc: event.desc
        });
    }

    setTitle(e) {
        this.setState({ title: e });
    }

    setDescription(e) {
        this.setState({ desc: e });
    }

    setResourceId(e) {
        this.setState({ resourceId: e });
    }

    handleStartTime = (event, date) => {
        this.setState({ start: date });
    };

    handleEndTime = (event, date) => {
        this.setState({ end: date });
    };

    handleDragStart = event => {
        this.setState({ draggedEvent: event })
    }

    newEvent() {
        const { start, end, title, resourceId, desc } = this.state;
        if (!title) return null;
        const id = this.state.events.length;
        let newEvent = [
            ...this.state.events,
            {
                id,
                title,
                start,
                end,
                resourceId,
                desc
            }
        ];
        this.setState({
            events: newEvent
        });
    };

    updateEvent() {
        const { title, desc, start, end, resourceId, events, clickedEvent } = this.state;
        const index = events.findIndex(event => event === clickedEvent);
        const updatedEvent = events.slice();
        updatedEvent[index].title = title;
        updatedEvent[index].desc = desc;
        updatedEvent[index].start = start;
        updatedEvent[index].end = end;
        updatedEvent[index].resourceId = parseInt(resourceId);
        this.setState({
            events: updatedEvent
        });
    }

    deleteEvent() {
        let updatedEvents = this.state.events.filter(
            event => event['start'] !== this.state.start
        );
        this.setState({ events: updatedEvents });
    }

    resizeEvent = ({ event, start, end }) => {
        const { events } = this.state

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
                ? { ...existingEvent, start, end }
                : existingEvent
        })

        this.setState({
            events: nextEvents,
        })

        //alert(`${event.title} was resized to ${start}-${end}`)
    }

    onDropFromOutside = (args) => {
        const { start, end, allDay } = args
        const { draggedEvent } = this.state

        const event = {
            id: draggedEvent.id,
            title: draggedEvent.title,
            start,
            end,
            allDay: allDay,
        }

        this.setState({ draggedEvent: null })
        this.moveEvent({ event, start, end })
    }

    eventStyleGetter(event) {
        let backgroundColor = '#ff7f50'
        if(event.bgColor)
            backgroundColor = event.bgColor;
        const style = {
            backgroundColor: backgroundColor,
            borderRadius: '3px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
        };
        return {
            style: style
        };
    }

    moveEvent = (args) => {
        const { event, start, end, resourceId, isAllDay: droppedOnAllDaySlot } = args
        const { events } = this.state
        console.log(args)

        let allDay = event.allDay

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
                ? { ...existingEvent, start, end, allDay, resourceId }
                : existingEvent
        })

        this.setState({
            events: nextEvents,
        })
        console.log(this.state.events)
    }

    newEventFromButton =() => {
        this.setState({
            start: '',
            end: '',
            title: '',
            resourceId: '',
            desc: '',
            openSlot: true
        })
    }

    render() {
        const { classes } = this.props;
        const eventActions = <>
            <Button onClick={this.handleClose}>Отмена</Button>
            <Button
                onClick={() => {
                    this.deleteEvent();
                    this.handleClose();
                }}
            >
                Удалить
            </Button>
            <Button
                onClick={() => {
                    this.updateEvent();
                    this.handleClose();
                }}
            >
                Изменить
            </Button>
        </>;

        const appointmentActions = <>
            <Button onClick={this.handleClose}>Отмена</Button>
            <Button onClick={() => {
                this.newEvent();
                this.handleClose();
            }}>
                Submit
            </Button>
        </>;
        return (
            <>
            <button onClick={this.newEventFromButton}>add</button>
                <DragAndDropCalendar
                    selectable
                    resizable
                    localizer={localizer}
                    events={this.state.events}
                    defaultView={Views.WEEK}
                    scrollToTime={new Date(1970, 1, 1, 6)}
                    defaultDate={new Date(2015, 3, 12)}
                    onDoubleClickEvent={event => this.handleEventSelected(event)}
                    onSelectSlot={event => this.handleSlotSelected(event)}
                    eventPropGetter={(this.eventStyleGetter)}
                    onEventDrop={this.moveEvent}
                    views={['month', 'week', 'day', 'agenda']}
                    components={{ event: Event }}

                    onEventResize={this.resizeEvent}
                    popup={true}
                    onDragStart={console.log}
                    dragFromOutsideItem={
                        this.state.displayDragItemInCell ? this.dragFromOutsideItem : null
                    }
                    onDropFromOutside={this.onDropFromOutside}
                    handleDragStart={this.handleDragStart}

                    resources={resourceMap}
                    resourceIdAccessor='resourceId'
                    resourceTitleAccessor='resourceTitle'

                />

                <Dialog
                    className={classes.dialog}
                    open={this.state.openEvent || this.state.openSlot}
                    onClose={this.handleClose}
                >
                    <DialogTitle id='form-dialog-title'>Event</DialogTitle>

                    <DialogContent>
                        <TextField
                            id='standard-basic'
                            label='Title'
                            defaultValue={this.state.title}
                            autoFocus
                            margin='dense'
                            size='large'
                            multiline='true'
                            onChange={e => {
                                this.setTitle(e.target.value);
                            }}
                        />
                        <br />
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor='age-native-simple'>Resource</InputLabel>
                            <Select
                                native
                                value={this.state.resourceId}
                                onChange={event => {
                                    this.setState({ resourceId: event.target.value });
                                }}
                                inputProps={{
                                    name: 'age',
                                    id: 'age-native-simple'
                                }}
                            >
                                {this.state.resourceMap.map(resource =>
                                    <>
                                        <option value={resource.resourceId}>{resource.resourceTitle}</option>
                                    </>
                                )}
                            </Select>
                        </FormControl>
                        <br />
                        <TextField
                            id='standard-basic'
                            label='Description'
                            margin='dense'
                            size='large'
                            multiline='true'
                            defaultValue={this.state.desc}
                            onChange={e => {
                                this.setDescription(e.target.value);
                            }}
                        />
                        <br />
                        <TextField
                            id='time'
                            label='Start'
                            type='time'
                            margin='dense'
                            size='large'
                            defaultValue={moment(this.state.start).format('HH:mm')}
                            onChange={event => {
                                let NewDate = this.state.start;
                                NewDate.setHours(event.target.value.slice(0, 2));
                                NewDate.setMinutes(event.target.value.slice(-2));
                                this.setState({ start: NewDate });
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{
                                step: 300 // 5 min
                            }}
                        />
                        <br />
                        <TextField
                            id='time'
                            label='End'
                            type='time'
                            margin='dense'
                            size='large'
                            defaultValue={moment(this.state.end).format('HH:mm')}
                            onChange={event => {
                                let NewDate = this.state.end;
                                NewDate.setHours(event.target.value.slice(0, 2));
                                NewDate.setMinutes(event.target.value.slice(-2));
                                this.setState({ end: NewDate });
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            inputProps={{
                                step: 300 // 5 min
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        {
                            this.state.openSlot && appointmentActions
                        }
                        {
                            this.state.openEvent && eventActions
                        }
                    </DialogActions>

                </Dialog>

            </>
        );
    }
}

CalendarView.propTypes = propTypes;

class CalendarToolbar extends Toolbar {

    componentDidMount() {
        const view = this.props.view;
        console.log(view)
    }

    render() {
        return (
            <div>
                <div className="rbc-btn-group">
                    <button type="button" onClick={() => this.navigate('TODAY')}>today</button>
                    <button type="button" onClick={() => this.navigate('PREV')}>back</button>
                    <button type="button" onClick={() => this.navigate('NEXT')}>next</button>
                </div>
                <div className="rbc-toolbar-label">{this.props.label}</div>
                <div className="rbc-btn-group">
                    <button type="button" onClick={this.view.bind(null, 'month')}>Month</button>
                    <button type="button" onClick={this.view.bind(null, 'week')}>Week</button>
                    <button type="button" onClick={this.view.bind(null, 'day')}>Day</button>
                    <button type="button" onClick={this.view.bind(null, 'agenda')}>Agenda</button>
                </div>
            </div>
        );
    }
}

function Event({ event }) {
    return (
        <span>
      <strong>{event.title}</strong>
    </span>
    );
}

export default withStyles(useStyles)(CalendarView);
