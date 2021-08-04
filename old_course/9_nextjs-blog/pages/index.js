import React, { Component } from "react";
import Link from "next/link";
import Router from "next/router";

function Home(props) {
  return (
    <div>
      <h1>Home Page!</h1>
      <div>Stars: {props.stars}</div>
      <Link href="/auth">
        <a>Login</a>
      </Link>
      <button onClick={() => Router.push("/auth")}>Auth</button>
    </div>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = res.json();
  console.log(json);
  return { stars: json.stargazers_count };
};

export default Home;
