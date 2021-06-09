export function validateItensOrder(itens) {
    let hasError = false

    itens.every(item => {
        if (item.errors.quantity) {
            hasError = true
            return false
        }
        if (item.errors.liquidityPrice) {
            hasError = true
            return false
        }
    });

    return hasError
}
