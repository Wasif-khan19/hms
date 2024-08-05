/* eslint-disable jsx-a11y/img-redundant-alt */

import Navbar from "../navbar/Navbar";
import Sidebar from "../navbar/Sidebar";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

const ApplyDoctor = () => {
  const handleFinish = (values)=>{
    console.log(values);
    
  }
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* side bar */}
      <Sidebar />

      <div className="flex flex-col sm:gap-4 sm:py-0 sm:pl-14">
        {/* header top */}
        <Navbar />

        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-4">
          <form onFinish={handleFinish}>
            <div className=" grid flex-1 gap-4">
              <div className="items-center gap-4">
                <h1 className="flex-1 text-center shrink-0 whitespace-nowrap text-5xl font-semibold tracking-tight sm:grow-0">
                  Apply Doctor
                </h1>
              </div>
              <div className="">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
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
                              rules={[{required: true}]}
                              id="first-name"
                              type="text"
                              className="w-full"
                              placeholder="First Name"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block mt-1">Last Name</label>
                            <Input
                              required
                              id="last-name"
                              type="text"
                              className="w-full"
                              placeholder="Last Name"
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
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block mt-1">Website</label>
                            <Input
                              required
                              id="wesbite"
                              type="url"
                              className="w-full"
                              placeholder="URL"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid auto-rows-max items-start mt-10 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
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
                            <label className="block mt-1">Specialization</label>
                            <Input
                              required
                              id="specialization"
                              type="text"
                              className="w-full"
                              placeholder="your specialization"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block mt-1">Experience</label>
                            <Input
                              required
                              id="experience"
                              type="text"
                              className="w-full"
                              placeholder="experience"
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
                              placeholder="fee per consultant"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block mt-1">Timings</label>
                            <Input
                              required
                              id="timing"
                              type="text"
                              className="w-full"
                              placeholder="timing"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="items-center text-center mt-5">
                  <Button size="lg">Submit</Button>
                </div>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
export default ApplyDoctor;
