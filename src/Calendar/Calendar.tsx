import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import '../App.css';
import BaseEventLabel from "./CustomV";
import CalendarStore from "./CalendarStore";
import {inject} from "mobx-react";




interface IProps {
    allEvents?: any;
}

class Calendar extends React.Component<IProps>{


    constructor(props) {
        super(props);
    }

    public componentDidMount() {


    }


    // public componentDidUpdate(prevProps: Readonly<{ selectedTheme: React.CSSProperties }>, prevState: Readonly<{}>, snapshot?: any) {
    //     console.log(this.props, prevProps)
    // }

    public shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<{}>, nextContext: any): boolean {
        return false;
    }

    eventDropMove=(eventDropInfo)=>{
        CalendarStore.eventMoveHandler(eventDropInfo);
    }

    calendarRef = (node)=>{
            CalendarStore.addFcApiToStore(node)
    }


    render(){

        return (
                <div>

                    <FullCalendar
                        ref={this.calendarRef}
                        plugins={[ timeGridPlugin, listPlugin, dayGridPlugin, interactionPlugin ]}
                        initialView="dayGridMonth"
                        eventContent={BaseEventLabel}
                        events={this.props.allEvents}
                        headerToolbar={{//кнопки и заголовок вверху календаря.
                            right: "prev,next today",
                            center: 'title',
                            left: 'timeGridWeek,timeGridDay,listDay'
                            //left:"listDay,listWeek,listMonth,listYear"

                        }}
                        editable={true}//изменение событий в календаре dragNdrop
                        selectable={true}//выделение нескольких событий, щелкая и перетаскивая
                        selectMirror={true}//only applies to the TimeGrid views, выбирает временной диапазон
                        dayMaxEvents={true} //всплывашка + Максимальное количество событий в течение дня
                        eventDrop={this.eventDropMove}
                        locale={'uk'}//язык тайтла и дней недели
                        //timeZone={"ISO"}
                        //firstDay={1}//первый день недели , 0-sunday, 1-monday etc
                        weekNumberCalculation={"ISO"} //this option defaults to 1 (Monday).
                    />
                </div>
        );
    }

}

export default inject(() => {
    return {
        allEvents: CalendarStore.getEventsArray
    };
})(Calendar);

// const Calendar = ({selectedTheme}: {selectedTheme: React.CSSProperties}) => {
//
//     const sheet = StyleSheet.create({
//         selectedTheme
//     })
//
//     const allEvents = CalendarStore.getEventsArray;
//     //console.log('отрисовка календарьКомпонент');
//
//
//     const eventDropMove = (eventDropInfo) =>{
//         //console.log(eventDropInfo)
//         CalendarStore.eventMoveHandler(eventDropInfo)
//     }
//
//
//     return (
//         <div>
//             <div className={css(sheet.selectedTheme)}>
//                 <FullCalendar
//                     ref={(node) => {
//                         console.log(node);
//                     }}
//                     plugins={[ timeGridPlugin, listPlugin, dayGridPlugin, interactionPlugin ]}
//                     initialView="dayGridMonth"
//                     eventContent={BaseEventLabel}
//                     events={allEvents}
//                     headerToolbar={{//кнопки и заголовок вверху календаря.
//                         right: "prev,next today",
//                         center: 'title',
//                         left: 'dayGridMonth,timeGridWeek,timeGridDay,listDay'
//                         //left:"listDay,listWeek,listMonth,listYear"
//
//                     }}
//                     editable={true}//изменение событий в календаре dragNdrop
//                     selectable={true}//выделение нескольких событий, щелкая и перетаскивая
//                     selectMirror={true}//only applies to the TimeGrid views, выбирает временной диапазон
//                     dayMaxEvents={true} //всплывашка + Максимальное количество событий в течение дня
//                     eventDrop={eventDropMove}
//
//                 />
//             </div>
//         </div>
//     );
// }
//
// export default observer(Calendar);





