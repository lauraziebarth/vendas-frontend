export function calculateTotalOrder(itens){
    const total = itens.reduce((accumulator, item) => {
        accumulator = accumulator + item.total
        return accumulator
    }, 0)

    return total
}