import { Task } from "@app/base/Task";

export default new Task({
    name: "supply-drop",
    enable: false, // is currently disabled
    display: "Drop a supply every 20 minutes",
    // This website can help you create frequencies for node cron https://crontab.guru/
    frequency: "*/20 * * * *", 
    run() {
        // logic here
    },
})