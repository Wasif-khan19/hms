/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../navbar/Sidebar";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { updateNotifications } from "../../redux/features/userSlice";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",  
    website: "",
    specialization: "",
    experience: "",
    feesPerConsultation: "",
    timings: "",
  });



  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const handleUpdate = async (event) => {
    event.preventDefault();
   

    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://192.168.100.24:4000/api/doctor/updateDoctorProfile",
        { ...formValues, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        alert(res.data.message);
        navigate("/");

        dispatch(
          updateNotifications([
            ...user.notifications,
            { message: "Application submitted" },
          ])
        );

      } else {
        console.log(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "http://192.168.100.24:4000/api/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
        setFormValues({
          firstName: res.data.data.firstName,
          lastName: res.data.data.lastName,
          phone: res.data.data.phone,
          address: res.data.data.address,
          email: res.data.data.email,
          website: res.data.data.website,
          specialization: res.data.data.specialization,
          experience: res.data.data.experience,
          feesPerConsultation: res.data.data.feesPerConsultation,
          timings: res.data.data.timings,
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.id]: event.target.value });
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col sm:gap-4 sm:py-0 sm:pl-14">
        {/* Navbar */}
        <Navbar />
        {doctor && (
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-4">
            <form onSubmit={handleUpdate}>
              <div className="grid flex-1 gap-4">
                <div className="items-center gap-4">
                  <h1 className="flex-1 text-center shrink-0 whitespace-nowrap text-5xl font-semibold tracking-tight sm:grow-0">
                    Update Doctor Profile
                  </h1>
                </div>
                <div className="">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personal Details</CardTitle>
                        <CardDescription>
                          Enter your personal details below
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="flex items-center justify-between space-x-4">
                            <div className="flex-1">
                              <label className="block mt-1">First Name</label>
                              <Input
                                required
                                id="firstName"
                                type="text"
                                className="w-full"
                                placeholder="First Name"
                                value={formValues.firstName}
                                onChange={handleChange}
                                
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block mt-1">Last Name</label>
                              <Input
                                required
                                id="lastName"
                                type="text"
                                className="w-full"
                                placeholder="Last Name"
                                value={formValues.lastName}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between space-x-4">
                            <div className="flex-1">
                              <label className="block mt-1">Phone No</label>
                              <Input
                                required
                                id="phone"
                                type="text"
                                className="w-full"
                                placeholder="Phone"
                                value={formValues.phone}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block mt-1">Address</label>
                              <Input
                                required
                                id="address"
                                type="text"
                                className="w-full"
                                placeholder="Address"
                                value={formValues.address}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between space-x-4">
                            <div className="flex-1">
                              <label className="block mt-1">Email</label>
                              <Input
                                required
                                id="email"
                                type="email"
                                className="w-full"
                                placeholder="Email"
                                value={formValues.email}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block mt-1">Website</label>
                              <Input
                                id="website"
                                type="url"
                                className="w-full"
                                placeholder="URL"
                                value={formValues.website}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start mt-10 lg:col-span-2 lg:gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Professional Details</CardTitle>
                        <CardDescription>
                          Enter your professional details below
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="flex items-center justify-between space-x-4">
                            <div className="flex-1">
                              <label className="block mt-1">
                                Specialization
                              </label>
                              <Input
                                required
                                id="specialization"
                                type="text"
                                className="w-full"
                                placeholder="Specialization"
                                value={formValues.specialization}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block mt-1">Experience</label>
                              <Input
                                required
                                id="experience"
                                type="text"
                                className="w-full"
                                placeholder="Experience"
                                value={formValues.experience}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between space-x-4">
                            <div className="flex-1">
                              <label className="block mt-1">Fees</label>
                              <Input
                                required
                                id="fees"
                                type="text"
                                className="w-full"
                                placeholder="Fee per consultation"
                                value={formValues.feesPerConsultation}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block mt-1">Timings</label>
                              <Input
                                required
                                id="timing"
                                type="text"
                                className="w-full"
                                placeholder="Timings"
                                value={formValues.timings}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="items-center text-center mt-5">
                    <Button size="lg" type="submit">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </main>
        )}
      </div>
    </div>
  );
}

export default Profile;
