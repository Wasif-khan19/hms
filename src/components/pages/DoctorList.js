import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate()
  return (
    <div className="w-80 mx-auto">
      <div className="relative overflow-hidden h-full rounded-md transition duration-200 group bg-white hover:shadow-xl border-gray-500">
        <div className="p-4">
          <h2 className="font-bold text-lg text-center text-black">
            {doctor.firstName} {doctor.lastName}
          </h2>

          <h2 className="font-normal space-x-1 flex items-center justify-center my-4 text-sm text-white">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Experience</Button>
                </TooltipTrigger>
                <TooltipContent className='bg-blue-500 text-white'>
                  <p>{doctor.experience}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Fees</Button>
                </TooltipTrigger>
                <TooltipContent className='bg-blue-500 text-white'>
                  <p>Rs: {doctor.feesPerConsultation}/-</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Specialization</Button>
                </TooltipTrigger>
                <TooltipContent className='bg-blue-500 text-white'>
                  <p>{doctor.specialization}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h2>
          <div className="flex flex-row justify-between items-center mt-10">
            <span className="text-base text-black">{doctor.timings[0]}-{doctor.timings[1]}</span>
            <button onClick={()=> navigate(`/doctor/appointments/${doctor._id}`)} className="relative cursor-pointer z-10 px-6 py-2 bg-blue-500 text-white font-bold rounded-md block text-xs">
              Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
