import type { RootState } from '../../../../hooks/ducks/store';
import { useAppSelector, useAppDispatch } from '../../../../hooks/ducks/hooks';
import { counterSlice } from '../../../../hooks/ducks/counter';
import { Button, Text, View } from 'react-native';


export default function HomeScreen() {
    const count = useAppSelector((state: RootState) => state.counter.count)
    const dispatch = useAppDispatch()
    const actions = counterSlice.actions

    return (
        <View>
            <Button
                title="Increment"
                aria-label="Increment value"
                onPress={() => dispatch(actions.increment())}
            />
            <Button
                aria-label="Decrement value"
                title="Decrement"
                onPress={() => dispatch(actions.decrement())}
            />
            <Button
                aria-label="Decrement value"
                title="incrementByAmount"
                onPress={() => dispatch(actions.incrementByAmount(10))}
            />
            <Text>{count}</Text>
        </View>
    );
}