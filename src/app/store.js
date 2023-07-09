import { configureStore } from "@reduxjs/toolkit";
import  allUser  from "../features/getUserSlice";

export const store = configureStore ({

    reducer : {
        app : allUser
    }
})