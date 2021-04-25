import { Details } from "../details";

export interface PostsState{
    posts : Details[]
}
export const initialState : PostsState = {
    posts : [
      {
        "firstName": "ahdkad",
        "lastName": "rfr",
        "email": "vdefda@in",
        "mobile": "1254383439",
        "address": "Pune",
        "date": '4/18/2021, 10:34:19 PM',
        "id": 1
      },
      {
        "firstName": "ahdkad",
        "lastName": "vfvf",
        "email": "vasdsc@in",
        "mobile": "7824244434",
        "address": "Delhi",

        "date": '4/1/2021, 10:34:19 PM',
        "id": 2
      },
      {
        "firstName": "ahdkad",
        "lastName": "vfvf",
        "email": "vasdsc@in",
        "mobile": "7824244434",
        "address": "Delhi",

        "date": '3/12/2021, 10:34:19 PM',
        "id": 3
      },
      
      
    ]

}