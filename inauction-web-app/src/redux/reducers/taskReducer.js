import {
    GET_TASKS,
    ADD_TASK,
    DELETE_TASK,
    GET_TASK,
    TASK_LOADING,
    GET_TASKS_EXPERT,
    CLEAR_TASK,
    DELETE_TASK_EXPERT,
    ADD_TASK_TWO,
    UPDATE_TASK,
    GET_TASKS_TYPES
} from "../actions/types";

const initialState = {
  tasks: [],
  tasks_types: [],
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
        case GET_TASKS_TYPES:
            return {
                ...state,
                tasks_types: action.payload
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
                tasks: [action.payload, ...state.tasks],
                task: action.payload
            }
        case ADD_TASK_TWO:
            return {
                ...state,
                tasksExpert: [action.payload, ...state.tasksExpert],
                task: action.payload
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            }
        case DELETE_TASK_EXPERT:
            return {
                ...state,
                tasksExpert: state.tasksExpert.filter(task => task._id !== action.payload)
            }
        case GET_TASK:
            return {
                ...state,
                task: action.payload,
                loading: false
            };
        case UPDATE_TASK: {
            return {
                ...state,
                tasks: state.tasks.map(x => (x._id === action.payload._id) ? action.payload : x),
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