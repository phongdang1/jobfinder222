import Job from "../../../assets/illustration/job/job3.png";

function JobHero() {
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      <div className="flex flex-col justify-center w-full text-center md:text-left p-4 ml-36 rounded-lg col-span-1 text-wrap">
        <div className="text-primary font-semibold text-2xl sm:text-3xl md:text-4xl pb-4 sm:pb-6 md:pb-8 ml-32">
          <p className="font-poppins whitespace-nowrap">
            Find Suitable Job For You
          </p>
        </div>
        <div className="font-poppins text-black font-light text-lg sm:text-xl pb-4 sm:pb-6 md:pb-8  ml-32">
          Thousands of jobs in the computer, engineering and technology sectors
          are waiting for you.
        </div>
        <div className="flex justify-center items-center p-4"></div>
      </div>
      <div
        className="ml-40 bg-center bg-cover w-3/5 h-[280px] col-span-1"
        style={{
          backgroundImage: `url(${Job})`,
        }}
      ></div>
    </div>
  );
}

export default JobHero;
