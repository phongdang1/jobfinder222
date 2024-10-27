import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getValueByCode } from "@/fetchData/AllCode";
import {
  AttachMoneyRounded,
  CasesRounded,
  LocationOnRounded,
} from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkViewCompany } from "@/fetchData/CvPost";

function CandidateCard({ candidates }) {
  const [values, setValues] = useState([]);
  const navigate = useNavigate();

  const handleProceedClick = async (userId) => {
    try {
      const response = await checkViewCompany(3);
      const allowCv = response.data.allowCv;
      console.log(response.data.allowCv);
      if (response.data) {
        navigate(`/company/candidateDetail/${userId}/${allowCv}`);
      }

      console.log(userId, allowCv);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchValuesForCandidates = async () => {
      try {
        const allValues = await Promise.all(
          candidates.map(async (candidate) => {
            const [
              jobLevelValue,
              experienceJobValue,
              salaryJobValue,
              addressValue,
            ] = await Promise.all([
              getValueByCode(candidate.jobLevelCode),
              getValueByCode(candidate.experienceJobCode),
              getValueByCode(candidate.salaryJobCode),
              getValueByCode(candidate.addressCode),
            ]);

            return [
              jobLevelValue?.data?.data?.value ?? "Not updated",
              experienceJobValue?.data?.data?.value ?? "Not updated",
              salaryJobValue?.data?.data?.value ?? "Not updated",
              addressValue?.data?.data?.value ?? "Not updated",
            ];
          })
        );

        setValues(allValues);
      } catch (error) {
        console.error("Error fetching values:", error);
      }
    };

    fetchValuesForCandidates();
  }, [candidates]);

  const getMatchPercentageColor = (percentage) => {
    if (percentage <= 25) return "text-red-500";
    if (percentage <= 50) return "text-orange-500";
    if (percentage <= 75) return "text-yellow-500";
    return "text-green-500";
  };

  const sortCandidate = candidates.sort(
    (a, b) => parseFloat(b.file) - parseFloat(a.file)
  );

  return (
    <>
      {sortCandidate.map((c, index) => {
        const matchPercentage = parseFloat(c.file) || 0;

        return (
          <div
            key={index}
            className="grid grid-cols-6 p-4 border border-gray-300 rounded-lg mt-4 hover:bg-primary/5 hover:border hover:border-primary font-poppins"
          >
            <div className="bg-gray-100 h-full w-4/5 col-span-1 rounded-full cursor-pointer">
              <img
                src={c.image}
                alt={`${c.UserDetailData.firstName} ${c.UserDetailData.lastName}`}
              />
            </div>
            <div className="space-y-2 col-span-4">
              <div className="flex gap-2 items-center">
                <p className="text-primary text-xl font-medium cursor-pointer">
                  {c.UserDetailData.firstName} {c.UserDetailData.lastName}
                </p>
                <Badge className="bg-white border border-primary hover:text-primary hover:bg-white">
                  Active
                </Badge>
              </div>
              <div className="flex gap-2">
                <p>Desired Position:</p>
                <p className="text-primary font-semibold">
                  {values[index]?.[0] || "Not updated"}
                </p>
              </div>
              <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                  <CasesRounded className="text-primary" />
                  <p>{values[index]?.[1] || "Not updated"}</p>
                </div>
                <div>|</div>
                <div className="flex gap-2 items-center">
                  <AttachMoneyRounded className="text-primary" />
                  <p>{values[index]?.[2] || "Not updated"}</p>
                </div>
                <div>|</div>
                <div className="flex gap-2 items-center">
                  <LocationOnRounded className="text-primary" />
                  <p>{values[index]?.[3] || "Not updated"}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center border border-primary-50 w-fit p-1 bg-primary/20 shadow-inner">
                <p className="text-black font-medium"> Match percentage:</p>
                <p className={getMatchPercentageColor(matchPercentage)}>
                  <span className="font-semibold text-lg">
                    {c.file || "Not available"}
                  </span>
                </p>
              </div>
            </div>
            <div className="col-span-1 flex justify-end items-end">
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant="outline"
                    className="text-primary border border-primary hover:bg-primary hover:text-white w-60"
                    onClick={() => handleProceedClick(c.UserDetailData.id)}
                  >
                    Detail Profile
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      <div className="flex items-center gap-2">
                        Lost 1 view to see{" "}
                        <p className="text-primary">
                          {c.UserDetailData.firstName}{" "}
                          {c.UserDetailData.lastName}
                        </p>{" "}
                        Information
                      </div>
                    </DialogTitle>
                    <DialogDescription>
                      <div className="flex justify-center gap-4 mt-4 mx-4">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="secondary"
                            className="w-1/2 bg-primary text-white hover:bg-primary/70"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          variant="outline"
                          className="text-primary border border-primary hover:bg-primary hover:text-white w-1/2"
                        >
                          Proceed ?
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CandidateCard;
