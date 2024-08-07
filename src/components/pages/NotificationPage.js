import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../navbar/Sidebar";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Notification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://192.168.100.24:4000/api/users/get-all-notification",
        { userId: user._id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        alert(res.data.message);
        window.location.reload();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://192.168.100.24:4000/api/users/delete-all-notifications",
        { userId: user._id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        alert(res.data.message);
        window.location.reload();
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      alert("Something went wrong");
    }
  };

  const NotificationRow = ({ notifications, isRead }) => {
    if (!notifications || notifications.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={3} className="text-center">
            No notifications
          </TableCell>
        </TableRow>
      );
    }

    return notifications.map((notification) => (
      <TableRow key={notification._id}>
        <TableCell className="hidden sm:table-cell"></TableCell>
        <TableCell className="font-medium">
          <div
            className="card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(notification.onClickPath)}
          >
            {notification.message}
          </div>
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-center">
                Actions
              </DropdownMenuLabel>
              <hr />
              {isRead ? (
                <DropdownMenuItem onClick={handleDeleteAllRead}>
                  Delete
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={handleMarkAllRead}>
                  Mark as Read
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-0 sm:pl-14">
        <Navbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="unread">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="unread">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage and view all your notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <NotificationRow
                        notifications={user?.notification}
                        isRead={false}
                      />
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="read">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage and view all your notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell"></TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <NotificationRow
                        notifications={user?.seennotification}
                        isRead={true}
                      />
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Notification;
