import { GetServerSideProps } from "next";
import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if(isLoading) return <p>Loading...</p>
  
  return <AuthForm />;
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession({req: context.req})

//   if(session) return {
//     redirect: {
//       destination: '/',
//       permanent: false
//     },
//     props: {}
//   }

//   return {
//     props: {}
//   }
// }

export default AuthPage;
