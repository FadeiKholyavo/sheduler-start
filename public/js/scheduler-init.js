scheduler.config.xml_date="%Y-%m-%d %H:%i";
			scheduler.init("scheduler_here", new Date(2018, 0, 20), "week");
			
			// load data from backend
			scheduler.load("/events", "json");

			// connect backend to scheduler
			var dp = new dataProcessor("/events");
			dp.init(scheduler);

			// set data exchange mode
			dp.setTransactionMode("REST");