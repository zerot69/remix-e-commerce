import { Form, useNavigate, useSearchParams } from "@remix-run/react";

export default function SearchBar() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const clearFilters = () => {
    searchParams.delete("filter");
    navigate("/home");
  };

  return (
    <div className="grid w-full place-items-center">
      <Form className="w-2/3">
        <label
          htmlFor="search-bar"
          className="sr-only mb-2 text-sm font-medium text-gray-900"
        >
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            name="search"
            id="search-bar"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900"
            placeholder="Search anything..."
            required
            autoComplete="off"
          />
          <button
            type="submit"
            className="absolute right-2.5 bottom-2.5 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-500"
          >
            Search
          </button>
          {searchParams.get("filter") && (
            <button
              onClick={clearFilters}
              className="rounded-xl bg-red-300 px-3 py-2 font-semibold text-blue-600 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-yellow-400"
            >
              Clear Filters
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}
