import type { ICard, IProductCountedVO, Products } from "~/interfaces";

type ProductsStoredType = Record<string, number>;

const LOCAL_STORAGE_KEY__CARD = 'card';

const saveCardToStorage = (value: Products) => localStorage.setItem(LOCAL_STORAGE_KEY__CARD,
  JSON.stringify(value.reduce<ProductsStoredType>((acc, cur) => (acc[cur.id!.toString()] = cur.amount!, acc), {})));

const useCard = (): ICard => {
  const data = useState<Products>('card', () => []);
  return {
    get amount() { return computed(() => data.value.length) },
    add(product: IProductCountedVO): any {
      product.amount = (product.amount || 0) + 1;
      console.log('> useCard -> add: product.amount =', product.amount);
      data.value.push(product);
      saveCardToStorage(data.value);
    },

    remove(product: IProductCountedVO): any {
      const index = data.value.findIndex(p => p === product);
      if (index >= 0) {
        data.value.splice(index, 1);
        product.amount!--;
        console.log('> useCard -> remove: product.amount =', product.amount);
        saveCardToStorage(data.value);
      }
    },
    restore(products: Products): any {
      const rawProducts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY__CARD) || '{}') as ProductsStoredType;
      console.log('> useCard -> restore: products =', {products, rawProducts});
      Object.keys(rawProducts).forEach((key) => {
        const id = parseInt(key);
        const amount = rawProducts[key] as number;
        const productVO = products.find(p => p.id === id);
        console.log('> \t =', {key, id, amount, productVO});
        if (productVO) {
          productVO.amount = amount;
          for (let i = amount; i > 0; i--) {
            data.value.push(productVO);
          }
        }
      })
    },
  }
}

export default useCard;
