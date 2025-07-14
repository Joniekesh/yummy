const chefs = ["/chef1.jpg", "/chef2.jpg", "/chef3.jpg", "/chef4.jpg"];

const OurChefs = () => {
  return (
    <div className="min-h-screen my-10 px-4 md:px-8 flex items-center flex-col">
      <h1 className="text-2xl md:text-4xl font-semibold mb-8">
        Our Professional Chefs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {chefs.map((item) => (
          <div
            className="bg-white shadow-md rounded-lg overflow-hidden"
            key={item}
          >
            <img
              className="w-full h-[400px] object-cover"
              src={item}
              alt="Chef"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurChefs;
