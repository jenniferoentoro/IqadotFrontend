// UsersPage.tsx
import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import Header from "../../components/template/Header.tsx";
import { useNavigate } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import { createUser } from "../../services/users/usersService.ts";

const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

  const handleBack = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate("/users");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await createUser(formData);

      console.log("User created successfully:", response);
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <Grid container justifyContent={"space-between"} alignItems={"center"} sx={{ mb: 3 }}>
        <Grid item>
          <Header text={"Add New User"} />
        </Grid>
        <Grid item>
          <Button
            startIcon={<ArrowBackIos />}
            variant={"contained"}
            color={"error"}
            onClick={(event) => {
              handleBack(event);
            }}
          >
            Back
          </Button>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="First Name" variant="outlined" fullWidth name="firstName" value={formData.firstName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Last Name" variant="outlined" fullWidth name="lastName" value={formData.lastName} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" variant="outlined" fullWidth name="email" value={formData.email} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Username" variant="outlined" fullWidth name="username" value={formData.username} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" variant="outlined" fullWidth name="password" type="password" value={formData.password} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add User
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default UsersPage;
