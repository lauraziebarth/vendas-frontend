export function validateItensOrder(itens) {
  let hasError = false;

  if (itens.length === 0) {
    return true;
  }

  itens.some((item) => {
    if (item?.errors?.quantity || item.quantity === '') {
      hasError = true;
      return false;
    }
    if (item?.errors?.liquidityPrice || item.liquidityPrice === '') {
      hasError = true;
      return false;
    }
  });

  return hasError;
}
