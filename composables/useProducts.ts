import type { IProducts } from "~/interfaces";

const useProducts = (): IProducts => {
  const data = useState<any>('products', () => []);
  return {
    get total() { return computed(() => data.value?.total || 0) },
    get list() { return computed(() => data.value.products) },
    retrieve(limit: number = 10, immediate: boolean = true): any {
      const config = useRuntimeConfig();
      console.log('> config.public.SERVER_URL -> ', config.public)
      const url = `${config.public.SERVER_URL}/products?limit=${limit}`;
      return useFetch(url, { immediate })
        .then((result) => {
          console.log('> useProducts -> retrieve: result =', result.data.value);
          data.value = result.data.value as any;
        });
    }
  }
}

export default useProducts;
