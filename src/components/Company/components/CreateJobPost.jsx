import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "@mui/icons-material";
import { useRef } from "react";

function CreateJobPost() {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  // Function to scroll to the desired section
  const scrollToSection = (sectionRef) => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grid grid-cols-3 mx-40 gap-4">
      {/* Left Trigger Menu - Make it sticky */}
      <div className="w-4/5 mx-24 col-span-1 mt-8 p-4 sticky top-[120px] self-start bg-white rounded-xl shadow-md border-2 border-gray-200 mb-8">
        <ul className="space-y-3 text-center">
          <li className="flex items-center justify-center gap-10 hover:bg-primary py-1 rounded-lg hover:text-white cursor-pointer group">
            <button
              className="text-third ml-10 group-hover:text-white"
              onClick={() => scrollToSection(section1Ref)}
            >
              Job Information
            </button>
            <CheckCircle className="text-default-300" />
          </li>
          <li className="flex items-center justify-center gap-10 hover:bg-primary py-1 rounded-lg hover:text-white cursor-pointer group">
            <button
              className="text-third ml-10 group-hover:text-white"
              onClick={() => scrollToSection(section2Ref)}
            >
              Job Information
            </button>
            <CheckCircle className="text-default-300" />
          </li>
          <li className="flex items-center justify-center gap-10 hover:bg-primary py-1 rounded-lg hover:text-white cursor-pointer group">
            <button
              className="text-third ml-10 group-hover:text-white"
              onClick={() => scrollToSection(section3Ref)}
            >
              Job Information
            </button>
            <CheckCircle className="text-default-300" />
          </li>
          <li className="flex items-center justify-center gap-10 hover:bg-primary py-1 rounded-lg hover:text-white cursor-pointer group">
            <button
              className="text-third ml-10 group-hover:text-white"
              onClick={() => scrollToSection(section4Ref)}
            >
              Job Information
            </button>
            <CheckCircle className="text-default-300" />
          </li>
        </ul>
      </div>

      {/* Right Form Section */}
      <div className="w-full col-span-2 p-4 mt-5 overflow-y-auto h-full">
        <div ref={section1Ref} className="bg-white rounded-xl shadow-md mb-8 ">
          <h2 className="h-full w-full text-xl text-white rounded-t-xl font-bold mb-4 bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 p-4">
            Section 1
          </h2>

          <div className="space-y-4 pb-4">
            <div className="px-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`rounded-lg`}
                />
              </div>
            </div>

            <div className="px-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`rounded-lg`}
                />
              </div>
            </div>
          </div>
        </div>

        <div ref={section2Ref} className="bg-white rounded-xl shadow-md mb-8 ">
          <h2 className="h-full w-full text-xl text-white rounded-t-xl font-bold mb-4 bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 p-4">
            Section 1
          </h2>

          <div className="space-y-4 pb-4">
            <div className="px-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`rounded-lg`}
                />
              </div>
            </div>

            <div className="px-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`rounded-lg`}
                />
              </div>
            </div>
          </div>
        </div>

        <div ref={section3Ref} className="bg-white rounded-xl shadow-md mb-8 ">
          <h2 className="h-full w-full text-xl text-white rounded-t-xl font-bold mb-4 bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 p-4">
            Section 1
          </h2>

          <div className="space-y-4 pb-4">
            <div className="px-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`rounded-lg`}
                />
              </div>
            </div>

            <div className="px-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`rounded-lg`}
                />
              </div>
            </div>
          </div>
        </div>

        <div ref={section4Ref} className="bg-white rounded-xl shadow-md mb-8 ">
          <h2 className="h-full w-full text-xl text-white rounded-t-xl font-bold mb-4 bg-gradient-to-r from-[#4a3d8d]/80 to-primary/90 p-4">
            Section 1
          </h2>

          <div className="space-y-4 pb-4">
            <div className="px-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`rounded-lg`}
                />
              </div>
            </div>

            <div className="px-4">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`rounded-lg`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 bg-slate-100">Footer here</div>
    </div>
  );
}

export default CreateJobPost;
