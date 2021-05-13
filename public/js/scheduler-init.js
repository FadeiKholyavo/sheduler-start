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
scheduler.templates.hour_scale = function(date){
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

// Init sheduler
scheduler.init("scheduler_here", new Date(), "week");

scheduler.load("/events", "json");

const dp = new dataProcessor("/events");
dp.init(scheduler);

dp.setTransactionMode("REST");