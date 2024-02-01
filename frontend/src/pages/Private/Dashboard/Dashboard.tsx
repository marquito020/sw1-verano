function Dashboard() {
  return (
    <>
      <div className=" bg-gray-50 flex items-center p-4 mt-16 rounded-lg">
        <section
          className="bg-cover bg-center py-32 w-full rounded-lg"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          }}
        >
          <div className="container mx-auto text-left text-white">
            <div className="flex items-center">
              <div className="w-1/2">
                <h1 className="text-5xl font-medium mb-6 ml-5">
                  Bienvenido!
                </h1>
                <p className="text-xl mb-12 ml-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                  viverra euismod odio, gravida pellentesque urna varius vitae.
                </p>
              </div>
              <div className="w-1/2 pl-16">
                <img
                  src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  className="h-64 w-full object-cover rounded-xl"
                  alt="Layout Image"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* <div className="p-24 flex flex-wrap items-center justify-center">
        <div className="flex-shrink-0 m-6 relative overflow-hidden bg-orange-500 rounded-lg max-w-xs shadow-lg">
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
            style={{ transform: "scale(1.5)", opacity: "0.1" }}
          >
            <rect
              x="159.52"
              y={175}
              width={152}
              height={152}
              rx={8}
              transform="rotate(-45 159.52 175)"
              fill="white"
            />
            <rect
              y="107.48"
              width={152}
              height={152}
              rx={8}
              transform="rotate(-45 0 107.48)"
              fill="white"
            />
          </svg>
          <div className="relative pt-10 px-10 flex items-center justify-center">
            <div
              className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
              style={{
                background: "radial-gradient(black, transparent 60%)",
                transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                opacity: "0.2",
              }}
            />
            <img
              className="relative w-40"
              src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
              alt=""
            />
          </div>
          <div className="relative text-white px-6 pb-6 mt-6">
            <span className="block opacity-75 -mb-1">Indoor</span>
            <div className="flex justify-between">
              <span className="block font-semibold text-xl">Peace Lily</span>
              <span className=" bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                $36.00
              </span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 m-6 relative overflow-hidden bg-teal-500 rounded-lg max-w-xs shadow-lg">
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
            style={{ transform: "scale(1.5)", opacity: "0.1" }}
          >
            <rect
              x="159.52"
              y={175}
              width={152}
              height={152}
              rx={8}
              transform="rotate(-45 159.52 175)"
              fill="white"
            />
            <rect
              y="107.48"
              width={152}
              height={152}
              rx={8}
              transform="rotate(-45 0 107.48)"
              fill="white"
            />
          </svg>
          <div className="relative pt-10 px-10 flex items-center justify-center">
            <div
              className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
              style={{
                background: "radial-gradient(black, transparent 60%)",
                transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                opacity: "0.2",
              }}
            />
            <img
              className="relative w-40"
              src="https://user-images.githubusercontent.com/2805249/64069998-305de300-cc9a-11e9-8ae7-5a0fe00299f2.png"
              alt=""
            />
          </div>
          <div className="relative text-white px-6 pb-6 mt-6">
            <span className="block opacity-75 -mb-1">Outdoor</span>
            <div className="flex justify-between">
              <span className="block font-semibold text-xl">Monstera</span>
              <span className=" bg-white rounded-full text-teal-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                $45.00
              </span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 m-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg">
          <svg
            className="absolute bottom-0 left-0 mb-8"
            viewBox="0 0 375 283"
            fill="none"
            style={{ transform: "scale(1.5)", opacity: "0.1" }}
          >
            <rect
              x="159.52"
              y={175}
              width={152}
              height={152}
              rx={8}
              transform="rotate(-45 159.52 175)"
              fill="white"
            />
            <rect
              y="107.48"
              width={152}
              height={152}
              rx={8}
              transform="rotate(-45 0 107.48)"
              fill="white"
            />
          </svg>
          <div className="relative pt-10 px-10 flex items-center justify-center">
            <div
              className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
              style={{
                background: "radial-gradient(black, transparent 60%)",
                transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                opacity: "0.2",
              }}
            />
            <img
              className="relative w-40"
              src="https://user-images.githubusercontent.com/2805249/64069899-8bdaa180-cc97-11e9-9b19-1a9e1a254c18.png"
              alt=""
            />
          </div>
          <div className="relative text-white px-6 pb-6 mt-6">
            <span className="block opacity-75 -mb-1">Outdoor</span>
            <div className="flex justify-between">
              <span className="block font-semibold text-xl">Oak Tree</span>
              <span className=" bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                $68.50
              </span>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Dashboard;
