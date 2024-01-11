import SingleAuthors from "./SingleAuthors";


const Authors = () => {
  return (
    <div className="py-8 lg:py-24">
      <div className="flex items-center mb-4 lg:mb-8 w-full lg:w-10/12">
        <div>
          <h1 className="text-2xl font-bold py-10 lg:px-20">Authors</h1>

          <div className="flex flex-col items-center">
          <SingleAuthors />
          <SingleAuthors />
          <SingleAuthors />
          <SingleAuthors />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authors;
