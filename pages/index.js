import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Card from "../components/Card";
import { Grid } from "@mui/material";
import { getSession } from "next-auth/react";
import axios from "axios";

export default function Home() {
  const Router = useRouter();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const securePage = async () => {
      if (!localStorage.getItem("data")) {
        Router.push("/login");
      }
    };
    securePage();
    axios.get("/api/posts/getAll").then(({ data }) => {
      setPosts(data);
      console.log(data);
    });
  }, []);
  return (
    <div>
      {/* <Grid 
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ backgroundColor:'red' , minHeight: '100vh', width:'90%' }}

      > */}

      <Grid
        container
        spacing={0}
        direction="row"
        justifyContent="left"
        style={{
          minHeight: "100vh",
          gap: "20px",
          width: "90%",
          margin: "auto ",
          marginTop: "100px",
        }}
      >
        {/* <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card /> */}
        {posts.map((card) => (
          <Card {...card} />
        ))}
      </Grid>
      {/* </Grid> */}
    </div>
  );
}
