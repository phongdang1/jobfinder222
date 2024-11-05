import Job from "../../../assets/illustration/payment.png";

function ProductHero() {
  return (
    <div className="grid grid-cols-2 gap-2 w-full my-10">
      <div className="flex flex-col justify-center w-full text-center md:text-left p-4 ml-36 rounded-lg col-span-1 text-wrap">
        <div className="text-primary font-semibold text-2xl sm:text-3xl md:text-4xl pb-4 sm:pb-6 md:pb-8 ml-32">
          <p className="font-poppins whitespace-nowrap">Purchase Packages</p>
        </div>
        <div className="font-poppins text-black font-light text-lg  pb-4 sm:pb-6 md:pb-8  ml-32">
          Manages purchases of premium recruitment packages, enhancing job
          visibility and enabling access to candidate profiles for efficient
          hiring.
        </div>
        <div className="flex justify-center items-center p-4"></div>
      </div>
      <img
        className="ml-40 bg-center bg-cover w-1/2 h-[310px] col-span-1"
        src={Job}
      ></img>
    </div>
  );
}

export default ProductHero;
