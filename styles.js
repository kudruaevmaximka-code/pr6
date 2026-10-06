import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    habitItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    habitText: {
        fontSize: 16,
    },
    empty: {
        textAlign: 'center',
        color: '#999',
        marginTop: 30,
    },
    addBtn: {
        backgroundColor: '#2c3e50',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    addBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },
});