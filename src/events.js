import { dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

const locales = {
    'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
});

const resourceMap = [
    { resourceId: 1, resourceTitle: 'Board room' },
    { resourceId: 2, resourceTitle: 'Training room' },
    { resourceId: 3, resourceTitle: 'Meeting room 3' },
    { resourceId: 4, resourceTitle: 'Meeting room 4' },
    // { resourceId: 5, resourceTitle: 'Meeting room 5' },
    // { resourceId: 6, resourceTitle: 'Meeting room 6' },
    // { resourceId: 7, resourceTitle: 'Meeting room 7' },
    // { resourceId: 8, resourceTitle: 'Meeting room 8' }
];

export default [
    {
        id: 0,
        title: 'All Day Event very long title',
        start: new Date(),
        end: new Date(2021, 4, 10),
        allDay: true,
        'bgColor': '#ff7f50',
        resourceId: 1
    },
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2015, 3, 7),
        end: new Date(2015, 3, 10),
        resourceId: 2,
        'bgColor': '#dc143c',
    },

    {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0),
        'bgColor': '#ff8c00',
        resourceId: 3
    },

    {
        id: 3,
        title: 'DTS ENDS',
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0),
        'bgColor': '#9932cc',
        resourceId: 2
    },

    {
        id: 4,
        title: 'Some Event',
        start: new Date(2015, 3, 9, 0, 0, 0),
        end: new Date(2015, 3, 9, 0, 0, 0),
        'bgColor': '#e9967a',
        resourceId: 1
    },
    {
        id: 5,
        title: 'Conference',
        start: new Date(2015, 3, 11),
        end: new Date(2015, 3, 13),
        desc: 'Big conference for important people',
        'bgColor': '#8fbc8f',
        allDay: true,
        resourceId: 4
    },
    {
        id: 6,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 10, 30, 0, 0),
        end: new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
        allDay: true,
        'bgColor': '#cd5c5c',
        resourceId: 2
    },
    {
        id: 7,
        title: 'Lunch',
        start: new Date(2015, 3, 12, 12, 0, 0, 0),
        end: new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch',
        'bgColor': '#98fb98',
        resourceId: 3
    },
    {
        id: 8,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 14, 0, 0, 0),
        end: new Date(2015, 3, 12, 15, 0, 0, 0),
        'bgColor': '#afeeee',
        resourceId: 1
    },
    {
        id: 9,
        title: 'Happy Hour',
        start: new Date(2015, 3, 12, 17, 0, 0, 0),
        end: new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day',
        'bgColor': '#db7093',
        resourceId: 1
    },
    {
        id: 10,
        title: 'Dinner',
        start: new Date(2015, 3, 12, 20, 0, 0, 0),
        end: new Date(2015, 3, 12, 21, 0, 0, 0),
        'bgColor': '#cd853f',
        resourceId: 1
    },
    {
        id: 11,
        title: 'Birthday Party',
        start: new Date(2015, 3, 13, 7, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0),
        'bgColor': '#b0e0e6',
        resourceId: 1
    },
    {
        id: 12,
        title: 'Late Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 18, 2, 0, 0),
        'bgColor': '#cd853f',
        resourceId: 1
    },
    {
        id: 13,
        title: 'Multi-day Event',
        start: new Date(2015, 4, 12, 9, 30, 0),
        end: new Date(2015, 4, 12, 23, 0, 0),
        'bgColor': '#db7093',
        resourceId: 1
    },
    {
        id: 14,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
        'bgColor': '#cd853f',
        resourceId: 1
    },
    {
        id: 15,
        title: 'Meetings',
        start: new Date(2015, 3, 12),
        end: new Date(2015, 3, 12),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
        allDay: true,
        'bgColor': '#cd5c5c',
        resourceId: 2
    },
    {
        id: 16,
        title: 'safasdfasfas',
        start: new Date(2015, 3, 14),
        end: new Date(2015, 3, 15),
        desc: 'Big conference for important people',
        'bgColor': '#8fbc8f',
        allDay: true,
        resourceId: 4
    },
];


export { localizer, resourceMap, locales }
