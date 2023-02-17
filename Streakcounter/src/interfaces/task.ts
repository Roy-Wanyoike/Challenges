import { counter} from "./task";

interface taskList {
    taskName: string;
    image: File | HTMLElement;
    date: Date;
    id: number;
}



export const taskListReducer = (state: taskList[] = [], action: actionType) => {
    switch (action.type) {
        case ADD_TASK:
            return [
               ...state,
                {
                    taskName: action.payload.taskName,
                    image: action.payload.image,
                    date: action.payload.date,
                    id: counter()
                    