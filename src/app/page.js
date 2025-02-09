
export default function Home() {

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="items-center font-bold text-[4vw] text-white">
        Miles of Support
      </div>
      <div className="text-[1.5vw] text-center font-normal text-white">
        Together, we go the extra mile
      </div>
      
      <div className="flex my-[2vh]">
      <button type="button" className="w-[8vw] text-[1vw] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Start Here
      </button>

      <button type="button" className="w-[8vw] text-[1vw] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
        Read More
      </button>
      </div>

    </div>
  );
}
