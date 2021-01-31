function Stars(props) {
  return <div>Next stars: {props.stars}</div>;
}

Stars.getInitialProps = async (ctx) => {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const json = await res.json();
  return { stars: json.stargazers_count };
};

export default Stars;
