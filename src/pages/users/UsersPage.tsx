import React, { useEffect, useState } from "react";
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Header from "../../components/template/Header.tsx";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { UserResponse } from "../../dto/users/userResponse.ts";
import UserCard from "../../components/users/UserCard.tsx";
import { getAllUsers } from "../../services/users/usersService.ts";

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserResponse[]>([]);

  useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleAdd = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate("/users/add");
  };

  return (
    <>
      <Grid container justifyContent={"space-between"} alignItems={"center"} sx={{ mb: 3 }}>
        <Grid item>
          <Header text={"Users"} />
        </Grid>
        <Grid item>
          <Button
            startIcon={<Add />}
            variant={"contained"}
            onClick={(event) => {
              handleAdd(event);
            }}
          >
            Add New User
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: UserResponse, index: number) => {
              return <UserCard no={index} key={index} user={user} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersPage;
