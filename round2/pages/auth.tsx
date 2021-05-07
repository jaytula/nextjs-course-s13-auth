import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  return <AuthForm />;
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession({ req: context.req });
//   console.log({session});
//   if (!session) {
//     return {
//       props: {},
//     };
//   }

//   return {
//     props: {},
//     redirect: {
//       destination: "/profile",
//     },
//   };
// };

export default AuthPage;
