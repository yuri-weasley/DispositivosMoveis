import { useEffect } from "react";
import { View } from "react-native";

export default function ProdutoLista() {
    const [produtos, setProdutos] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        obterProdutos().then(objs => setProdutos(objs));
    }, [isFocused]);

    const myKeyExtractor = item => {
        return item.codigo.toString();
    }

    return (
        <View style={styles.container}>
            <FlatList style={styles.scrollContainer}
            data={produtos}
            contentContainerStyle={styles.itemsContainer}
            keyExtractor={myKeyExtractor}
            renderItem={({item}) => <ProdutoItem produto={item} />}
            />
        </View>
    );
}