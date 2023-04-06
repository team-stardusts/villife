import { Button, Text, View } from 'react-native';


export default function HomeScreen() {

    return (
        <View>
            <Button
                title="Increment"
                aria-label="Increment value"
            />
            <Button
                aria-label="Decrement value"
                title="Decrement"
            />
            <Button
                aria-label="Decrement value"
                title="incrementByAmount"
            />
        </View>
    );
}