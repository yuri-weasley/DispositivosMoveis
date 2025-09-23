export default function ProdutoItem(props) {
    return (
        <View style={styles.container}
        id={props.produto.codigo}>
        <Text style={styles.textItem}>
            {props.produto.codigo} - {props.produto.nome}
        </Text>
        <Text style={styles.textItem}>
        Quantidade: {props.produto.quantidade}
        </Text>
    </View>
    );
}