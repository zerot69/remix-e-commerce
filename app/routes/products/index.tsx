import toast, { Toaster } from "react-hot-toast";
import { Link, useLoaderData } from "@remix-run/react";

import Pagination from "~/components/pagination";
import SearchBar from "~/components/searchbar";

export async function loader({ request }: { request: any }) {
  const searchData = new URL(request.url).searchParams.get("search");
  return await fetch(
    searchData
      ? `https://635739669243cf412f94ec88.mockapi.io/Products?search=${searchData}`
      : `https://635739669243cf412f94ec88.mockapi.io/Products?page=1&limit=20`
  );
}

export default function ProductIndexPage() {
  const products = useLoaderData();

  const handleAddToCart = (
    id: string,
    name: string,
    quantity: number,
    price: string
  ) => {
    const currentCart = JSON.parse(localStorage.getItem("cart")!) || [];
    const item = {
      id: id,
      name: name,
      quantity: quantity,
      price: parseInt(price) * 1000,
    };
    if (currentCart.length === 0) {
      currentCart.push(item);
    } else {
      let temp = -1;
      for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i].id === id) temp = i;
      }
      if (temp >= 0) {
        currentCart[temp].quantity += quantity;
      } else {
        currentCart.push(item);
      }
    }
    localStorage.setItem("cart", JSON.stringify(currentCart));
  };

  return (
    <div className="mt-8 w-full pb-40">
      <h1 className="text-gray-00 p-8 pt-20 pl-24 text-5xl">Eco Store</h1>

      <div className="py-4 pl-24">
        <Link
          to="/products/tgdd"
          className="text-yellow-500 hover:text-yellow-600"
        >
          Eco Store ✕ Thế giới di động
        </Link>
      </div>

      <SearchBar />
      <Pagination />

      {products.length === 0 ? (
        <h2 className="w-full pt-20 text-center">
          Nothing found! Please try another keyword!
        </h2>
      ) : (
        <div className="mt-8 grid grid-cols-1 justify-items-center px-4 md:grid-cols-2 md:px-12 lg:grid-cols-3 lg:px-6 xl:gap-6 xl:px-4 2xl:grid-cols-4 2xl:gap-6 2xl:px-24">
          {products.map((product: any) => (
            <div key={product.id}>
              <section className="w-80 overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg">
                <Link to={`/products/${product.id}`} prefetch="intent">
                  <div className="overflow-hidden">
                    <img
                      className="h-80 w-80 object-cover object-center duration-300 hover:scale-110 lg:h-80 lg:w-80"
                      src={product.image}
                      alt={product.shortDesc}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="py-2 text-lg font-bold text-gray-700 hover:underline">
                      {product.name}
                    </h3>
                    <p className="font-italic text-gray-700">
                      {product.description}
                    </p>
                    <p className="py-2 text-center text-lg font-bold text-yellow-400">
                      {(product.price * 1000).toLocaleString()}₫
                    </p>
                  </div>
                </Link>

                <div className="flex flex-col px-8 pb-4">
                  <button
                    onClick={() => {
                      handleAddToCart(
                        product.id,
                        product.name,
                        1,
                        product.price
                      );
                      toast.success("Great! Item added.");
                    }}
                    className="my-2 flex w-full items-center justify-center rounded-lg border border-transparent bg-yellow-400 px-6 py-1 text-base font-medium text-white hover:bg-yellow-500 md:py-2 md:px-10 md:text-lg"
                  >
                    Add to cart
                  </button>
                </div>
              </section>
            </div>
          ))}
        </div>
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "rgba(251, 191, 36)",
            color: "#fff",
          },
          iconTheme: {
            primary: "white",
            secondary: "black",
          },
        }}
      />
    </div>
  );
}
