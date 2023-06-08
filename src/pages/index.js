import Link from "next/link";
import CustomHead from "../components/CustomHead";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <CustomHead />

      <div className="flex flex-col items-center justify-center h-screen">
        <img src="/images/logo.png" alt="Logo" className="mb-4 h-16 w-auto" />
        <h1 className="font-bold text-3xl text-center">
          Welcome to Toms Todo App!
        </h1>
        <p>
          Go to the{" "}
          <Link href="/todos">
            <span className="text-blue-500">Todos</span>
          </Link>{" "}
          page to manage your jobs.
        </p>
      </div>
    </>
  );
}
