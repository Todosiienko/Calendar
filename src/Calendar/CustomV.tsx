import React, {memo, useEffect} from "react";
import CalendarStore from "./CalendarStore";
import {observer} from "mobx-react-lite";


const MeetingEventLabel = memo(({title}: {title: string}) => {

    return (
        <div style={{background:'coral'}}>
            <div >{title}</div>
            <svg xmlns="http://www.w3.org/2000/svg" height={15} width={15} viewBox="0 0 32 32"><g><path d="M23.78,6.15A11,11,0,0,0,8.22,21.71l4.1,4.1a1,1,0,1,0,1.42-1.42l-4.1-4.1a9,9,0,1,1,12.72,0l-7.07,7.07a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l7.07-7.07A11,11,0,0,0,23.78,6.15Z"/><path d="M21,14a5,5,0,1,0-5,5A5,5,0,0,0,21,14Zm-8,0a3,3,0,1,1,3,3A3,3,0,0,1,13,14Z"/></g></svg>
        </div>
    )
})

const CustomEventLabel = observer(({eventId}: {eventId: string})=> {
    const event = CalendarStore.getEventsId(eventId);



    if (event) {
        const {title, type} = event;

        if (type === "meeting") {
            return <MeetingEventLabel title={title}/>
        } else if(type === "task"){
            return (
                <div>
                    <div>{title}</div>
                    <div>deadline-25.12.20</div>
                </div>)
        } else if(type === ''){
            return (
                <div>
                    <div>{title}</div>
                </div>
            )
        }
    }

   return null;

});

const BaseEventLabel = (arg)=> {

    return (<CustomEventLabel key={arg.event.id} eventId={arg.event.id} />)
}

export default BaseEventLabel;

// (prevProps, nextProps)=> {
//     if(prevProps.eventId !== nextProps.eventId){
//         return false;
//     }
//     return true
// }





// <div title=" some location !!!!">
//                 <svg xmlns="http://www.w3.org/2000/svg" height={15} width={15} viewBox="0 0 32 32"><g><path d="M23.78,6.15A11,11,0,0,0,8.22,21.71l4.1,4.1a1,1,0,1,0,1.42-1.42l-4.1-4.1a9,9,0,1,1,12.72,0l-7.07,7.07a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l7.07-7.07A11,11,0,0,0,23.78,6.15Z"/><path d="M21,14a5,5,0,1,0-5,5A5,5,0,0,0,21,14Zm-8,0a3,3,0,1,1,3,3A3,3,0,0,1,13,14Z"/></g></svg>
//             </div>
//
// const showFurtherOptions= (arg)=> {
//
//     if (arg.event._def.extendedProps.type === "meeting") {
//         return (
//             <div style={{overflow: "hidden"}}>
//                 <div style={{background:'green'}}>{arg.event._def.title}</div>
//                 <svg xmlns="http://www.w3.org/2000/svg" height={15} width={15} viewBox="0 0 32 32"><g><path d="M23.78,6.15A11,11,0,0,0,8.22,21.71l4.1,4.1a1,1,0,1,0,1.42-1.42l-4.1-4.1a9,9,0,1,1,12.72,0l-7.07,7.07a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l7.07-7.07A11,11,0,0,0,23.78,6.15Z"/><path d="M21,14a5,5,0,1,0-5,5A5,5,0,0,0,21,14Zm-8,0a3,3,0,1,1,3,3A3,3,0,0,1,13,14Z"/></g></svg>
//             </div>
//         )
//     } else if(arg.event._def.extendedProps.type === "task"){
//         return (
//             <div>
//                 <div>{arg.event._def.title}</div>
//                 <p>deadline-25.12.20</p>
//             </div>)
//     }
// }
