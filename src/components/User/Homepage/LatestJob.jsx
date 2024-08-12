import Card from "./Card";

function LatestJob() {
  return (
    <div className="flex flex-col mx-20 pt-10">
      <div className="text-5xl font-forum mb-8 font-semibold ml-16">
        Latest <span className="text-5xl text-primary ">Job</span> For You
      </div>

      <div className="-mt-10">
        <Card />
      </div>
    </div>
  );
}

export default LatestJob;
