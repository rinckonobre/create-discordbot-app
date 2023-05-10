export type TaskType = {
    name: string
    enable: boolean
    display: string,
    frequency: string,
    run(): any,
}

export class Task {
    constructor(options: TaskType){
        Object.assign(this, options);
    }
}