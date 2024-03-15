import {
    GET_TASKS,
    ADD_TASK,
    DELETE_TASK,
    GET_TASK,
    TASK_LOADING,
    RESET_LOADING,
    GET_TASKS_EXPERT,
    CLEAR_TASK,
    DELETE_TASK_EXPERT,
    ADD_TASK_TWO,
    UPDATE_TASK,
    GET_TASKS_NAMES,
} from "./tasksActionTypes";

const initialState = {
  tasks: [],
  tasks_names: [],
  task: {},
  loading: false,
  tasksExpert: []
};

export default function(state = initialState, action){
  switch (action.type){
        case TASK_LOADING:
            return {
                ...state,
                loading: true
            };
        case RESET_LOADING:
            return {
                ...state,
                loading: false
            };
        case GET_TASKS_NAMES:
            return {
                ...state,
                tasks_names: action.payload
            };
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        case GET_TASKS_EXPERT:
            return {
                ...state,
                tasksExpert: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                task: action.payload
            }
        case ADD_TASK_TWO:
            return {
                ...state,
                task: action.payload
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case DELETE_TASK_EXPERT:
            return {
                ...state,
                tasksExpert: state.tasksExpert.filter(task => task.id !== action.payload)
            }
        case GET_TASK:
            return {
                ...state,
                task: action.payload,
            };
        case UPDATE_TASK: {
            return {
                ...state,
                task: action.payload
            }
        }
        case CLEAR_TASK:
            return {
                ...state,
                task: {}
            }
        default:
            return state;
    }
}
