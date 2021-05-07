import { GetServerSideProps, GetServerSidePropsResult } from "next";
import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/client";

function ProfilePage() {
  return <UserProfile />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session)
    return {
      props: {},
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };

  return {
    props: { session },
  };
};

export default ProfilePage;
