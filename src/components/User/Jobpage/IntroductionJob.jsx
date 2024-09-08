import { Input } from "@/components/ui/input";
import SearchIcon from "@mui/icons-material/Search";
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { Button } from "@/components/ui/button";

function IntroductionJob() {
    return (
        <div>
            {/* Search Section */}
            <div className="flex items-center justify-center bg-opacity-80 mx-4 sm:mx-8 md:mx-16 lg:mx-24 my-8 rounded-2xl">
                <div className="flex flex-col w-full max-w-7xl">
                    {/* Text Section */}
                    <div className="flex flex-col justify-center w-full text-center md:text-left px-4">
                        <div>
                            <div className="text-black text-4xl sm:text-5xl md:text-6xl pb-4 sm:pb-6 md:pb-8">
                                <p className="font-poppins md:whitespace-nowrap">
                                    Find Your
                                    <span className="text-primary font-forum text-5xl sm:text-6xl md:text-7xl font-medium ml-2">
                                        new job
                                    </span>
                                    <span className="font-poppins ml-2 text-black">
                                        today
                                    </span>
                                </p>
                            </div>
                            <div className="font-poppins text-gray-500 text-lg sm:text-xl pb-4 sm:pb-6 md:pb-8 lg:whitespace-nowrap">
                                Thousands of jobs in the computer, engineering and technology sectors are waiting for you.
                            </div>
                        </div>
                    </div>
                    {/* Adjusted Search Section */}
                    <div className="flex flex-col md:flex-row justify-center items-center p-4">
                        <div className="flex md:w-full max-w-7xl flex-col md:flex-row items-center gap-0">
                            <div className="relative flex flex-1 items-center mb-4 md:mb-0">
                                <Input
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md rounded-r-none"
                                    type="text"
                                    placeholder="What position are you looking for?"
                                />
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <SearchIcon sx={{ color: "gray" }} />
                                </div>
                            </div>
                            <div className="relative flex flex-1 items-center mb-4 md:mb-0">
                                <Input
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md rounded-l-none rounded-r-none"
                                    type="text"
                                    placeholder="Location"
                                />
                                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                    <FmdGoodOutlinedIcon sx={{ color: "gray" }} />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="p-3 bg-third hover: text-white rounded-md rounded-l-none flex-shrink-0 w-full md:w-auto"
                            >
                                <p className="text-white">Search Job</p>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IntroductionJob;
