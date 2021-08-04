import Link from "next/link";

function Auth(props) {
  return (
    <div>
      <h1>Auth Page {props.stars} !</h1>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
    </div>
  );
}

Auth.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();
  console.log(ctx);
  return { stars: json.stargazers_count };
};

export default Auth;
