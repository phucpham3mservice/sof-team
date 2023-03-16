import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    console.log("session", session);
    return (
      <div className="cursor-pointer" onClick={() => signOut()}>
        <Image
          src="https://t4.ftcdn.net/jpg/00/62/89/77/360_F_62897778_Mpe0AmVF2IdNaAz7eNIW1vvpJQ7gSGne.jpg"
          alt="Picture of the author"
          width={80}
        />
      </div>
    );
  }
  return (
    <div onClick={() => signIn()} className="cursor-pointer">
      <Image
        src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button-1024x260.png"
        alt="Picture of the author"
        width={200}
      />
    </div>
  );
}
