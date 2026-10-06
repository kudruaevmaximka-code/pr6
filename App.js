import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { styles } from './styles';

const Stack = createStackNavigator();

function HabitListScreen({ navigation }) {
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
                        <Text>{item.completed ? 'Y' : 'N'}</Text>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => navigation.navigate('AddHabit')}
            >
                <Text style={styles.addBtnText}>+ Добавить привычку</Text>
            </TouchableOpacity>
        </View>
    );
}

function AddHabitScreen({ navigation }) {
    const [title, setTitle] = useState('');

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Введите название привычки');
            return;
        }
        navigation.goBack();
    };

    return (
        <View style={styles.screen}>
            <TextInput
                style={styles.input}
                placeholder="Название привычки"
                value={title}
                onChangeText={setTitle}
            />
            <Button title="Сохранить" onPress={handleSave} />
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