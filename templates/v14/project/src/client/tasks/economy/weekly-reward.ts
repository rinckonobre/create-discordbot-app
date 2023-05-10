import { Task } from "@app/base/Task";

export default new Task({
    name: "weekly-reward",
    enable: false, // is currently disabled
    display: "Give a weekly reward for @everyone",
    // This website can help you create frequencies for node cron https://crontab.guru/
    frequency: "0 0 * * 0", 
    run() {
        // logic here
    },
})