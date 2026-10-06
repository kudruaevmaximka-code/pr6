import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from './styles';

const Stack = createStackNavigator();

function HabitListScreen() {
    const [habits] = useState([
        { id: '1', title: 'Пить воду', completed: false },
        { id: '2', title: 'Дышать воздухом', completed: true },
        { id: '3', title: 'Смотреть глазами', completed: false },
        { id: '4', title: 'Есть ртом', completed: true },
    ]);

    return (
        <View style={styles.screen}>
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.habitItem}>
                        <Text style={styles.habitText}>{item.title}</Text>
                        <Text>{item.completed ? 'Yes' : 'No'}</Text>
                    </View>
                )}
            />
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