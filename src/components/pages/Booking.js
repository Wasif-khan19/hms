/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../navbar/Sidebar";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { DatePicker, TimePicker } from "antd";

const Booking = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctor, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://192.168.100.24:4000/api/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // =============== booking func
  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://192.168.100.24:4000/api/users/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-0 sm:pl-14">
        <Navbar />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="">
            <Card className="" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex">
                <div className="text-3xl">
                  <CardTitle>Appointment</CardTitle>
                </div>
              </CardHeader>
              {doctor && (
                <CardContent>
                  <Card
                    className="sm:col-span-2"
                    x-chunk="dashboard-05-chunk-0"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-2xl font-bold text-center">
                        Dr. {doctor.firstName} {doctor.lastName}
                      </CardTitle>
                      <CardTitle className="flex flex-row text-lg font-semibold gap-2 justify-between">
                        Experience:
                        <p className="font-thin text-gray-400 bg-[#151518] px-3 rounded-md ">
                          {doctor.experience}
                        </p>
                      </CardTitle>
                      <Separator className="my-4" />
                      <CardTitle className="flex flex-row text-lg font-semibold gap-2 justify-between">
                        Consult fee:
                        <p className="font-thin text-gray-400 bg-[#151518] px-3 rounded-md ">
                          Rs: {doctor.feesPerConsultation}/-
                        </p>
                      </CardTitle>
                      <Separator className="my-4" />
                      <CardTitle className="flex flex-row text-lg font-semibold gap-2 justify-between">
                        Timings:
                        <p className="font-thin text-gray-400 bg-[#151518] px-3 rounded-md ">
                          {doctor.timings && doctor.timings[0]} -{" "}
                          {doctor.timings && doctor.timings[1]}
                        </p>
                      </CardTitle>
                      <Separator className="my-4" />
                    </CardHeader>

                    <CardFooter className="flex flex-col gap-2">
                      {/* date and time picker */}
                      <DatePicker
                        className="w-full"
                        format="DD-MM-YYYY"
                        onChange={(value) => {
                          if (value) {
                            console.log("Raw Date Value:", value); // Log raw value before formatting
                            const selectedDate = value.format("DD-MM-YYYY");
                            console.log("Formatted Date:", selectedDate); // Log formatted date
                            setDate(selectedDate);
                          } else {
                            console.log("No date selected"); // Handle case where no date is selected
                          }
                        }}
                      />

                      <TimePicker
                        format="HH:mm"
                        className=" w-full"
                        onChange={(value) => {
                          if (value) {
                            console.log("Raw Time Value:", value); // Log raw value before formatting
                            const selectedTime = value.format("HH:mm");
                            console.log("Formatted Time:", selectedTime); // Log formatted time
                            setTime(selectedTime);
                          } else {
                            console.log("No time selected"); // Handle case where no time is selected
                          }
                        }}
                      />

                      <Separator className="my-1" />
                      <div className="w-full space-y-2">
                        <Button className="w-full">Check Availablity</Button>
                        <button
                          onClick={handleBooking}
                          className="w-full rounded-md py-2 font-semibold bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          Book Appointment
                        </button>
                      </div>
                    </CardFooter>
                  </Card>
                </CardContent>
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Booking;
