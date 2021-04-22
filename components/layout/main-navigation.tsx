import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

import classes from "./main-navigation.module.css";
import { MouseEventHandler } from "react";

function MainNavigation() {
  const [session, loading] = useSession();

  console.log(loading);
  console.log(session);

  const logoutHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading ? (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          ) : null}
          {session ? (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          ) : null}
          {session ? (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
