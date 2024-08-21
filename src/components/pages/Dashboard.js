

import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../navbar/Sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import DoctorList from "./DoctorList";

const Dashboard = () => {
  const [doctors, setDoctor] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://192.168.100.24:4000/api/admin/getAllDoctors",
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
    getUserData();
  }, []);
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* side bar */}
      <Sidebar />

      <div className="flex flex-col sm:gap-4 sm:py-0 sm:pl-14">
        {/* header top */}
        <Navbar />

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
           
          </div>

          <div className="grid gap-2 md:gap-8">
            <Card className="xl:col-span-1" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="items-center text-center">
                <div className="grid gap-2">
                  <CardTitle>All Doctors</CardTitle>
                  <CardDescription>
                    Select a doctor to book an appointment
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                  {doctors &&
                    doctors.map((doctor) => <DoctorList doctor={doctor} />)}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
