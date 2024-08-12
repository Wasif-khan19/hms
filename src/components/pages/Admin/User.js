import { MoreHorizontal } from "lucide-react";

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
  DropdownMenuItem,
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
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../navbar/Sidebar";
import Navbar from "../../navbar/Navbar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  const getUser = async () => {
    try {
      const res = await axios.get(
        "http://192.168.100.24:4000/api/admin/getAllUsers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if ((res.status = 200)) {
        setUsers(res.data?.data);
      } else {
        setError("Failed to load users.");
      }
    } catch (error) {
      setError("An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

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
                  <CardTitle className='text-center text-3xl'>USERS LIST</CardTitle>
                  <CardDescription className='text-center'>
                  Manage and view all users applications here
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
                          <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
                          <TableHead>NAME</TableHead>
                          <TableHead>TYPE</TableHead>
                          <TableHead className="hidden md:table-cell">
                            EMAIL
                          </TableHead>
                          <TableHead>ACTION</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentUsers.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell className="font-medium"></TableCell>
                            <TableCell className="font-medium">
                              {user.name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {user.isDoctor ? "Doctor" : "User"}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {user.email}
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
                                  <DropdownMenuLabel className='text-center'>Actions</DropdownMenuLabel>
                                  <hr/>
                                  <DropdownMenuItem>Block</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
                <CardFooter className='text-center items-center justify-center flex'>
                  <div className="flex items-center">
                    {Array.from(
                      { length: Math.ceil(users.length / usersPerPage) },
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

export default User;
