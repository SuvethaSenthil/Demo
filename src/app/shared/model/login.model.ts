export interface LoginResponse {
    "user": {
        "_id": string;
        "name": string;
        "email": string;
        "studyPlans": any[] | [];
    },
    "token": string;

}