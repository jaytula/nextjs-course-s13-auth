import { FormEventHandler, useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm() {
  const oldPasswordRef = useRef<HTMLInputElement>();
  const newPasswordRef = useRef<HTMLInputElement>();

  const submitHandler: FormEventHandler = (event) => {
    event.preventDefault();

    const newPassword = newPasswordRef.current.value;
    const oldPassword = oldPasswordRef.current.value;

    fetch(`/api/user/change-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newPassword,
        oldPassword,
      }),
    })
      .then((res) => {
        return res.ok ? res.json() : undefined;
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="old-password">Old Password</label>
        <input type="password" id="old-password" ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
