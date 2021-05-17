scheduler.config.xml_date="%Y-%m-%d %H:%i";

// Config date in headers of day and month views
scheduler.templates.day_date = function(date){
    const formatFunc = scheduler.date.date_to_str("%l, %d. %F %Y (week %W)");
    return formatFunc(date);
};

scheduler.templates.week_date = function(start, end){
	const parseStartDate = scheduler.date.date_to_str("%l, %d. %F");
	const parseEndDate = scheduler.date.date_to_str("%l, %d. %F (week %W)");
	const endDate = scheduler.date.add(end,-1,"day");
    return parseStartDate(start) +" &ndash; " + parseEndDate(endDate);
};

// Add minutes to the dhx_scale_hour cell
const hour = scheduler.date.date_to_str("%H:%i");
const minutes = scheduler.date.date_to_str("%i");
			
scheduler.config.hour_size_px = 88;
scheduler.templates.hour_scale = (date) => {
	const step = 15;
	let html = `<div class="dhx_scale_hour_hours">${hour(date)}</div>`;
	for (let i = 0; i < 60/step; i++){
		if(minutes(date) != "00"){
			html += `<div class="dhx_scale_hour_minutes">${minutes(date)}</div>`;
		}
		date = scheduler.date.add(date, step, "minute");
	}
	return html;
}

//Show custom content
scheduler.attachEvent("onTemplatesReady", () => {

    scheduler.templates.event_header = (start, end, event) => {
	    const startDate = scheduler.templates.event_date(start);
		const endDate = scheduler.templates.event_date(end);
		const owner = scheduler.getLabel("owner_id", event.owner_id);
		return `${startDate} - ${endDate}, <b>${owner}</b>`;
	}

	scheduler.templates.event_text = (start, end, event) => {
		const text = event.text;
		const room = scheduler.getLabel("room_id", event.room_id);
        return `<b>${text}</b><br><i>${room}</i>`;
    }

}); 

//Add background color for the event-box according its owner
scheduler.templates.event_class = (start, end, event) => {
    return `owner_${event.owner_id}`; 
};

//Set custom tooltip text
scheduler.templates.tooltip_text = (start,end,event) => {
	const formatFunc = scheduler.date.date_to_str("%l, %d. %F %Y");
	const startDate = scheduler.templates.event_date(start);
	const endDate = scheduler.templates.event_date(end);
	const owner = scheduler.getLabel("owner_id", event.owner_id);
	const room = scheduler.getLabel("room_id", event.room_id);
	const text = event.text;
    return `<b>Event:</b> ${text}<br/>
				${startDate} - ${endDate}, ${formatFunc(start)}<br/>
				${owner}, ${room}
			`;
};

//Add new fields to the lightbox
scheduler.config.lightbox.sections=[    
	{ 
		name:"description", 
		height:50, 
		type:"textarea", 
		map_to:"text", 
		focus:true
	},
    { 
		name:"Room",    
		height:43, 
		type:"select", 
		map_to:"room_id", 
		default_value: 0,
		options: scheduler.serverList("rooms")
	},
	{ 
		name:"Owner",    
		height:43, 
		type:"select", 
		map_to:"owner_id", 
		default_value: 0,
		options: scheduler.serverList("owners")
	},
    { 
		name:"time",        
		height:72, 
		type:"time",     
		map_to:"auto"
	}   
];

//Init units view
scheduler.createUnitsView({
    name:"unit",
    property:"room_id",
    list: scheduler.serverList("rooms"),
	days: 3
});

// Config date in headers of units view
scheduler.templates.unit_date = (start, end) => {
    const formatFunc = scheduler.date.date_to_str("%F %d %Y");
	const startDate = formatFunc(start);
	const endDate = formatFunc(scheduler.date.add(end,-1,"day"));
    return `${startDate} - ${endDate}`;
};

//Init timeline view
scheduler.createTimelineView({
	name:	"timeline",
	x_unit:	"minute",
	x_date:	"%H:%i",
	x_step:	30,
	x_size: 24,
	x_start: 16,
	x_length: 48,
	y_unit:	scheduler.serverList("rooms"),
	y_property:	"room_id",
	render:"bar"
});


//Block events till the current date
scheduler.addMarkedTimespan({
	start_date: new Date(1970,12,12),
	end_date: new Date(),
	type:"dhx_time_block"
});

//Set default to the room_id and owner_id if their values are empty
function setDefaultValues(ev){
	ev.text = ev.text.replace(/[<>]/g, "");
	if(!ev.room_id) ev.room_id = 0;
	if(!ev.owner_id) ev.owner_id = 0;	
}
scheduler.attachEvent("onEventSave",(id, ev) => {
	setDefaultValues(ev);
	return true;
});
scheduler.attachEvent("onEventChanged",(id, ev) => {
	setDefaultValues(ev);
	return true;
});


// Init sheduler
scheduler.init("scheduler_here", new Date(), "week");
scheduler.load("/events", "json");

const dp = new dataProcessor("/events");

dp.init(scheduler);
dp.setTransactionMode("REST");