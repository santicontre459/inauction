export const taskNames = {
    "CREATE_EVENT_RELATED": "Create Event Related",
    "DRAFT_EVENT_RELATED": "Draft Event Related",
    "EVALUATION_EVENT_RELATED": "Evaluation Event Related",
    "RESPOND_QUESTIONNAIRES": "Respond Questionnaires",
    "OTHER": "Other",
};

export const taskTypes = {
    // CREATE_EVENT_RELATED
    "CREATE_ONLY_SETTINGS": "Create Only Settings",
    "CREATE_ENTIRE_EVENT": "Create Entire Event",

    // DRAFT_EVENT_RELATED
    "UPDATE_SETTINGS": "Update Settings",
    "UPDATE_QUESTIONNAIRES": "Update Questionnaires",
    "CREATE_DOCUMENTS": "Create Documents",
    "UPDATE_DOCUMENTS": "Update Documents",
    "CREATE_BILL_OF_QUANTITIES": "Create Bills Of Quantities",
    "UPDATE_BILL_OF_QUANTITIES": "Update Bills Of Quantities",
    "INVITE_BIDDERS": "Invite Bidders",

    // EVALUATION_EVENT_RELATED
    "EVALUATE_QUESTIONNAIRE_RESPONSES": "Evaluate Questionnaire Responses",
    "VERIFY_PARTICIPANTS_DOCUMENTS": "Verify Participants Documents",
    "PREPARE_EVALUATION_REPORT": "Prepare Evaluation Report",

    // RESPOND_QUESTIONNAIRES
    "FILL_BILL_OF_QUANTITIES": "Fill Bill Of Quantities",
    
    // OTHER
    "OTHER": "Other"
};

export const taskStatus = {
    0: 'Complete',
    1: 'In Progress',
    2: 'Cancelled',
    3: 'Todo',
    4: "Won't Do"
};

export const taskStatusLabelColor = {
    0: 'green',
    1: 'cyan',
    2: 'red',
    3: 'orange',
    4: 'magenta'
};
