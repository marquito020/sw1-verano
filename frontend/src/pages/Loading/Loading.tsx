function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white text-gray-900">
      <h1 className="text-5xl font-bold">Loading</h1>
      <span className="relative flex h-8 w-8 ml-2 mt-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500"></span>
      </span>
      <span className="relative flex h-8 w-8 ml-2 mt-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500"></span>
      </span>
      <span className="relative flex h-8 w-8 ml-2 mt-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-8 w-8 bg-sky-500"></span>
      </span>
    </div>
  );
}

export default Loading;

{
  /* <>
    <div className='bg-gray-100'>
    <div className=" rounded relative">
  <div className="rounded-full bg-indigo-200 w-[190px] h-[190px] relative flex justify-center items-center mx-auto animate-spin">
    <svg className="absolute top-[2px] right-0" width={76} height={97} viewBox="0 0 76 97" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1_2495_2146" fill="white">
        <path d="M76 97C76 75.6829 69.2552 54.9123 56.7313 37.6621C44.2074 20.4118 26.5466 7.56643 6.27743 0.964994L0.0860505 19.9752C16.343 25.2698 30.5078 35.5725 40.5526 49.408C50.5974 63.2436 56.007 79.9026 56.007 97H76Z" />
      </mask>
      <path d="M76 97C76 75.6829 69.2552 54.9123 56.7313 37.6621C44.2074 20.4118 26.5466 7.56643 6.27743 0.964994L0.0860505 19.9752C16.343 25.2698 30.5078 35.5725 40.5526 49.408C50.5974 63.2436 56.007 79.9026 56.007 97H76Z" stroke="#4338CA" strokeWidth={40} mask="url(#path-1-inside-1_2495_2146)" />
    </svg>
    <div className="rounded-full bg-white w-[150px] h-[150px]" />
  </div>
  <p className="absolute mx-auto inset-x-0 my-auto inset-y-[80px] text-base font-medium text-gray-800 text-center">
    Loading ...
  </p>
</div>

</div>
    </> */
}

// paginancion
{
  /* <>
            <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
                <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
                    <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                        <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
                    </div>
                    <div className="sm:flex hidden">
                        <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">1</p>
                        <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">2</p>
                        <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">3</p>
                        <p className="text-sm font-medium leading-none cursor-pointer text-indigo-700 border-t border-indigo-400 pt-3 mr-4 px-2">4</p>
                        <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">5</p>
                        <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">6</p>
                        <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">7</p>
                        <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">8</p>
                    </div>
                    <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                        <p className="text-sm font-medium leading-none mr-3">Next</p>
                        <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </> */
}
