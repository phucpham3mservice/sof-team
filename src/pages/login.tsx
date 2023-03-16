import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    console.log("session", session);
    return (
      <div className="cursor-pointer" onClick={() => signOut()}>
        <img
          width={80}
          src="https://t4.ftcdn.net/jpg/00/62/89/77/360_F_62897778_Mpe0AmVF2IdNaAz7eNIW1vvpJQ7gSGne.jpg"
          alt="google-logout"
        />
      </div>
    );
  }
  return (
    <div onClick={() => signIn()} className="cursor-pointer">
      <img
        width={200}
        src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button-1024x260.png"
        alt="google-login"
      />
    </div>
  );
}
