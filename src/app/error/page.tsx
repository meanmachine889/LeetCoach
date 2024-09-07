// pages/error.tsx
import { useRouter } from "next/router";
import Link from "next/link";

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">Authentication Error</h1>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      <Link href="/">
        <a className="mt-4 text-blue-500">Go back to homepage</a>
      </Link>
    </div>
  );
};

export default ErrorPage;
