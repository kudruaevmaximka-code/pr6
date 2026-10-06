import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HabitListScreen() {
    return (
        <View style={styles.screen}>
            <Text>Список привычек</Text>
        </View>
    );
}

function AddHabitScreen() {
    return (
        <View style={styles.screen}>
            <Text>Добавить привычку</Text>
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HabitList">
                <Stack.Screen
                    name="HabitList"
                    component={HabitListScreen}
                    options={{ title: 'Мои привычки' }}
                />
                <Stack.Screen
                    name="AddHabit"
                    component={AddHabitScreen}
                    options={{ title: 'Новая привычка' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, padding: 20, backgroundColor: '#fff' },
});