import task from '../interfaces/task'






class Task implements task {
    id: number;
    name: string;
    imageUrl: string;
    date: string;
    constructor(name: string, imageUrl: string, date: string) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.date = date;
        this.id = this.generateId();

    }
    generateId(): number {
        return Math.floor(Math.random() * 1000000000);
    }
}
class BestDoneTask implements bestInterface {
    streakCounter: StreakCounter;
    constructor(streakCounter: StreakCounter) {
        this.streakCounter = streakCounter;
    }
    getBest(): Task {
        // return task with the most done days 
        let bestTask: Task = this.streakCounter.tasks[0];
        for (let i = 0; i < this.streakCounter.tasks.length; i++) {
            if (Days.create(this.streakCounter.tasks[i]).getDays()> Days.create(bestTask).getDays()) {
                bestTask = this.streakCounter.tasks[i];
            }
        }
        return bestTask;

    }
}