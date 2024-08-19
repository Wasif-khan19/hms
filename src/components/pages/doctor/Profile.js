import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Sidebar from "../../navbar/Sidebar";
import Navbar from "../../navbar/Navbar";

function Profile() {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  

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
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  return(
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col sm:gap-4 sm:py-0 sm:pl-14">
        {/* Navbar */}
        <Navbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {doctor && (
            
          )}
        </main>
      </div>
    </div>
  );
}

export default Profile;
