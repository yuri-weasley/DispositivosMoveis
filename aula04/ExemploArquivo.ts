import AsyncStorage from "@react-native-async-storage/async-storage";

export const salvarCor = async (valor: string) => {
    try {
        await AsyncStorage.setItem('cor', valor);
    } catch (e) { }
}

export const obterCor = async (): Promise<string> => {
    try {
        const cor = await AsyncStorage.getItem('cor');
        return cor ?? "";
    } catch (e) {
        return "";
    }
}