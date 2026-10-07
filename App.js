import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
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

const STORAGE_KEY = '@habits';

const DEFAULT_HABITS = [
    { id: '1', title: 'Пить воду', completed: false },
    { id: '2', title: 'Дышать воздухом', completed: false },
    { id: '3', title: 'Смотреть глазами', completed: false },
    { id: '4', title: 'Есть ртом', completed: false },
];

function HabitListScreen({ navigation }) {
    const [habits, setHabits] = useState(DEFAULT_HABITS);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const saved = await AsyncStorage.getItem(STORAGE_KEY);
                if (saved) {
                    setHabits(JSON.parse(saved));
                }
            } catch (e) {
                Alert.alert('Ошибка', 'Не удалось загрузить привычки');
            } finally {
                setLoaded(true);
            }
        };
        load();
    }, []);

    useEffect(() => {
        if (!loaded) return;
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }, [habits, loaded]);

    const addHabit = (newHabit) => {
        setHabits((prev) => [...prev, newHabit]);
    };

    const toggleHabit = (id) => {
        setHabits((prev) =>
            prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={<Text style={styles.empty}>Привычек пока нет</Text>}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.habitItem}
                        onPress={() => toggleHabit(item.id)}
                    >
                        <Text style={styles.habitText}>{item.title}</Text>
                        <Text>{item.completed ? 'y' : 'n'}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => navigation.navigate('AddHabit', { onSave: addHabit })}
            >
                <Text style={styles.addBtnText}>+ Добавить привычку</Text>
            </TouchableOpacity>
        </View>
    );
}

function AddHabitScreen({ navigation, route }) {
    const [title, setTitle] = useState('');

    const handleSave = () => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Введите название привычки');
            return;
        }
        const newHabit = {
            id: Date.now().toString(),
            title: title.trim(),
            completed: false,
        };
        if (route.params?.onSave) {
            route.params.onSave(newHabit);
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