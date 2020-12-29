import {makeObservable, observable, computed, action, ObservableMap} from "mobx";
import React from "react";
import moment from "moment";


export interface IEvent{
    id:string;
    title:string;
    date?:string;
    type: string;
    start?:string;
    end?:string;
}

export interface IEventMove{
    title:string;
    oldDate:string;
    newDate:string;
}
class CalendarStore {
    FcApi:any;
    themes: Record<string, React.CSSProperties>;
    events: ObservableMap<string, IEvent>;
    userEventsMove: ObservableMap<string, IEventMove>;

    constructor() {
        this.userEventsMove = observable.map({
        })
        this.events = observable.map({
                "1":{id: "1", title: 'drink coffee', date: '2020-12-24T12:30:00', type: "task"},
                "1.1":{id: "1.1", title: 'action', date: '2020-12-24T16:00:00',type:''},
                "2": {id: "2", title: 'meeting text', date: '2020-12-17', type: "meeting" },
                "3": {id: "3", title: 'guests list', date: '2020-12-19', type: "meeting"},
            }
        );
        this.themes = {
           darkgrey:{
                 backgroundColor: "darkgrey",
                 fontSize:"10px",
                 width:'80%',
             },
           cadetBlue:{
                backgroundColor: "cadetBlue",
                fontSize:"15px",
                width:'80%',
            }
        }
        makeObservable(this, {
            FcApi:observable,
            userEventsMove:observable,
            events: observable,
            themes:observable,
            getEventsArray: computed,
            changeDate:action,
            changeType:action,
            getThemes:computed,
            eventMoveHandler:action,
            createNewEvent:action,
        })
    }



    get getEventsArray() {
        return Array.from(this.events.values()).map((event) => {
            return {
                id: event.id,
                title: event.title,
                date: event.date
            }
        })
    }
//TypeError: Cannot read property 'getApi' of null
    addFcApiToStore (node){
       // setTimeout(()=>{
       //     this.FcApi = node.getApi()
       // },1000)

            this.FcApi = node.getApi()

    }


    createNewEvent (titleText){
        this.events.set('09', {id:"09", title:titleText, type:"task", date:moment().format('YYYY-MM-DD')});
        // console.log(this.events.get('09'));

        this.FcApi.addEvent({id:"09", title:titleText, date:moment().format('YYYY-MM-DD')})
    }


    eventMoveHandler (eventDropInfo){
        this.userEventsMove.set(eventDropInfo.event.id, {title:eventDropInfo.event.title, newDate:eventDropInfo.event.startStr, oldDate:eventDropInfo.oldEvent.startStr})

    }
    getEventsId(id:string){
        return this.events.get(id);
    }

    changeDate (){
        const currentDate = this.events.get("2");
        currentDate.date = "2020-12-26";
        this.events.set('2', currentDate )

        this.FcApi.getEventById("2").setStart("2020-12-26");

    }
    changeType(){
        const currentEvent = this.events.get("1");
        currentEvent.type = "meeting";
        this.events.set('1', currentEvent);

    }

    get getThemes(){
        return this.themes;
    }

}
export default new CalendarStore();

