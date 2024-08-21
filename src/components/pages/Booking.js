/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCardIcon,
  MoreVertical,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../navbar/Sidebar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { Separator } from "../ui/separator";

const Booking = () => {
  const params = useParams();
  const [doctor, setDoctor] = useState(null);

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "http://192.168.100.24:4000/api/doctor/getDoctorById",
        { doctorId: params.doctorId },
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
      console.log(error.message);
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
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {/* first card */}
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
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
                          {doctor.timings[0]} - {doctor.timings[1]}
                        </p>
                      </CardTitle>
                      <Separator className="my-4" />
                      {/* timings picker */}
                      {/* date picker */}
                      <CardTitle className="flex flex-row text-lg font-semibold gap-2 justify-between">
                        Timings:
                        <p className="font-thin text-gray-400 bg-[#151518] px-3 rounded-md ">
                          {doctor.timings[0]} - {doctor.timings[1]}
                        </p>
                      </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex flex-col gap-2">
                      <Button className="w-full">Check Availablity</Button>
                      <button className="w-full rounded-md py-2 font-semibold bg-blue-500 hover:bg-blue-600 text-white">
                        Book Appointment
                      </button>
                    </CardFooter>
                  </Card>
                </CardContent>
              )}
            </Card>

            {/* second card */}
            {doctor && (
              <div>
                <Card
                  className="overflow-hidden"
                  x-chunk="dashboard-05-chunk-4"
                >
                  <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                      <CardTitle className="group flex items-center gap-2 text-lg">
                        Doctor ID: {doctor._id}
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Copy className="h-3 w-3" />
                          <span className="sr-only">Copy Order ID</span>
                        </Button>
                      </CardTitle>
                      <CardDescription>Date: {doctor.timings[0]}-{doctor.timings[1]} </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                      <div className="font-semibold">Order Details</div>
                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Glimmer Lamps x <span>2</span>
                          </span>
                          <span>$250.00</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Aqua Filters x <span>1</span>
                          </span>
                          <span>$49.00</span>
                        </li>
                      </ul>

                      <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Subtotal
                          </span>
                          <span>$299.00</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Shipping
                          </span>
                          <span>$5.00</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Tax</span>
                          <span>$25.00</span>
                        </li>
                        <li className="flex items-center justify-between font-semibold">
                          <span className="text-muted-foreground">Total</span>
                          <span>$329.00</span>
                        </li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-3">
                        <div className="font-semibold">
                          Shipping Information
                        </div>
                        <address className="grid gap-0.5 not-italic text-muted-foreground">
                          <span>Liam Johnson</span>
                          <span>1234 Main St.</span>
                          <span>Anytown, CA 12345</span>
                        </address>
                      </div>
                      <div className="grid auto-rows-max gap-3">
                        <div className="font-semibold">Billing Information</div>
                        <div className="text-muted-foreground">
                          Same as shipping address
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <div className="font-semibold">Customer Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Customer</dt>
                          <dd>Liam Johnson</dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Email</dt>
                          <dd>
                            <a href="mailto:">liam@acme.com</a>
                          </dd>
                        </div>
                        <div className="flex items-center justify-between">
                          <dt className="text-muted-foreground">Phone</dt>
                          <dd>
                            <a href="tel:">+1 234 567 890</a>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="grid gap-3">
                      <div className="font-semibold">Payment Information</div>
                      <dl className="grid gap-3">
                        <div className="flex items-center justify-between">
                          <dt className="flex items-center gap-1 text-muted-foreground">
                            <CreditCardIcon className="h-4 w-4" />
                            Visa
                          </dt>
                          <dd>**** **** **** 4532</dd>
                        </div>
                      </dl>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                      Updated{" "}
                      <time dateTime="2023-11-23">November 23, 2023</time>
                    </div>
                    <Pagination className="ml-auto mr-0 w-auto">
                      <PaginationContent>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                            <span className="sr-only">Previous Order</span>
                          </Button>
                        </PaginationItem>
                        <PaginationItem>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-6 w-6"
                          >
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="sr-only">Next Order</span>
                          </Button>
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Booking;
