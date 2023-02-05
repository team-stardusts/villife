import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const INCRESE = "TEST_COUNT/INCRESE" as const;


export type CounterState = {
    count: number;
}

const initialState: CounterState = {
    count: 0
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: state => {
            state.count += 1;
        },
        decrement: state => {
            state.count -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.count += action.payload;
        },
    }
})

export const {increment, decrement, incrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;

/* 구 버전 Redux
export const increseCount = (count: number) => {
    return {
        type: INCRESE, 
        payload: count,
    }
};

const counter = (state: CounterState=initalState, action: CounterAction): CounterState => {
    switch (action.type) {
        case INCRESE:
            return {
                ...state,
                count: action.payload,
            };
        default:
            return state;
    };
};

export default counter;
*/