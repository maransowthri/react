import Link from "next/link";

const errorPage = () => {
  return (
    <div>
      <h1>Error Buddy!</h1>
      <Link href="/">
        <a>Back To Home</a>
      </Link>
    </div>
  );
};

export default errorPage;
