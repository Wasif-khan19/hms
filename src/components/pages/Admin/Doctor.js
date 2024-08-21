import axios from "axios";
import { Ban, Check, MoreHorizontal, SquareCheck } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../navbar/Sidebar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Tabs, TabsContent } from "../../ui/tabs";

const Doctor = () => {
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);

  const getDoctor = async () => {
    try {
      const res = await axios.get(
        "http://192.168.100.24:4000/api/admin/getAllDoctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        setDoctor(res.data.data);
      } else {
        setError("Failed to load users.");
      }
    } catch (error) {
      setError("An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (record, status) => {
    try {
      const res = await axios.post(
        "http://192.168.100.24:4000/api/admin/changeAccountStatus",
        {
          doctorId: record._id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        alert(res.data.message);
        window.location.reload()
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const  currentUsers = doctor.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col sm:gap-4 sm:py-0 sm:pl-14">
        {/* Navbar */}
        <Navbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center text-3xl">
                    ALL DOCTORS
                  </CardTitle>
                  <CardDescription className="text-center">
                    Manage and view all doctor applications here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center">
                      <p>Loading...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-500">
                      <p>{error}</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px] hidden sm:table-cell"></TableHead>
                          <TableHead>NAME</TableHead>
                          <TableHead>STATUS</TableHead>
                          <TableHead className="hidden md:table-cell">
                            PHONE
                          </TableHead>
                          <TableHead>ACTION</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentUsers.map((doctor) => (
                          <TableRow key={doctor._id}>
                            <TableCell className="font-medium"></TableCell>
                            <TableCell className="font-medium">
                              {doctor.firstName} {doctor.lastName}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {doctor.status === "pending"
                                  ? "Pending Approval"
                                  : doctor.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {doctor.phone}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel className="text-center">
                                    Actions
                                  </DropdownMenuLabel>
                                  <hr />
                                  {doctor.status === "pending" ? (
                                    <div className="flex flex-row justify-center items-center">
                                      <button
                                        onClick={() =>
                                          handleApprove(doctor, "approved")
                                        }
                                        className="text-sm px-4 pt-1 text-center"
                                      >
                                        <SquareCheck color="#16a34a" size={23}/>
                                      </button>
                                      <button className="text-sm px-4 pt-1 "><Ban color=" #b91c1c" size={23}/></button>
                                    </div>
                                  ) : (
                                    <button disabled className="text-sm px-4">
                                      No actions available
                                    </button>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
                <CardFooter className="text-center items-center justify-center flex">
                  <div className="flex items-center">
                    {Array.from(
                      { length: Math.ceil(doctor.length / usersPerPage) },
                      (_, index) => (
                        <Button
                          key={index + 1}
                          onClick={() => paginate(index + 1)}
                          className={`mx-1 ${
                            currentPage === index + 1
                              ? "bg-blue-500 text-white"
                              : ""
                          }`}
                        >
                          {index + 1}
                        </Button>
                      )
                    )}
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Doctor;
