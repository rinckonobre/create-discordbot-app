import { Task } from "@app/base/Task";

export default new Task({
    name: "good-morning",
    enable: false, // is currently disabled
    display: "Good morning message",
    // This website can help you create frequencies for node cron https://crontab.guru/
    frequency: "0 6 * * *", 
    run() {
        console.log("Good morning")
    },
})