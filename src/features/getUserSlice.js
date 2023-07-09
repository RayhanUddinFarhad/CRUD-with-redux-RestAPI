import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getAllUser = createAsyncThunk(
    "getUsers",
    async (args, { rejectWithValue }) => {
        try {
            const response = await fetch(
                "https://crud-app-sunny-eka-server.vercel.app/users",
            );
            const result = await response.json();
            return result;
        } catch (err) {
            return rejectWithValue("Opps found an error", err.response.data);
        }
    }
);

export const getSingleUser = createAsyncThunk(
    "getSingleUser",
    async (id, { rejectWithValue }) => {
        const response = await fetch(
            `https://crud-app-sunny-eka-server.vercel.app/users/${id}`
        );
        try {
            const result = await response.json();
            return result;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const createUser = createAsyncThunk(
    "createUser",
    async (data) => {
        console.log(data);
        const response = await fetch(
            "https://crud-app-sunny-eka-server.vercel.app/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }
);
export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            await fetch(`https://crud-app-sunny-eka-server.vercel.app/users/${id}`, {
                method: "DELETE",
            });
            return id; // Return the deleted user's ID

        } catch (err) {
            console.log(err);
            return rejectWithValue(err.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    "updateUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `https://crud-app-sunny-eka-server.vercel.app/users/${data._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            return result;
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const allUser = createSlice({
    name: "usersList",

    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    extraReducers: {

        [getAllUser.pending]: (state) => {
            state.loading = true;
        },
        [getAllUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [getAllUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
       
        [getSingleUser.fulfilled]: (state, action) => {
            state.singleUser = [action.payload];
        },
        

        [createUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        },
        [deleteUser.pending]: (state) => {
            state.loading = true;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
            const id = action.payload;
            if (id) {
                state.users = state.users.filter((user) => user._id !== id);
            }
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        [updateUser.pending]: (state) => {
            state.loading = true;
        },
        [updateUser.fulfilled]: (state, action) => {
            console.log("updated user fulfilled", action.payload);
            state.loading = false;
            state.users = state.users.map((ele) =>
                ele._id === action.payload._id ? action.payload : ele
            );
        },
        [updateUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

    }

})

export default allUser.reducer;