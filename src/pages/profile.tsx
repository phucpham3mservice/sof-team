import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import jwt from "jsonwebtoken";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Login(props: any) {
  const { data: session } = useSession();

  React.useEffect(() => {
    if (session) {
      window.addEventListener("message", (event) => {
        if (event.data?.foo) {
          window.opener.postMessage({ msg: props.token }, "*");
          window.close();
        }
      });
    }
  }, [session]);

  if (session) {
    console.log("session", session);
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <div>
          <div className="flex items-center flex-col gap-3 space-x-4">
            {session.user?.image ? (
              <img
                className="w-14 h-14 rounded-full"
                src={session.user?.image}
                alt=""
              />
            ) : (
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            )}
            <div className="font-medium dark:text-white text-center">
              <div>{session.user?.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {session.user?.email}
              </div>
            </div>
            <div className="cursor-pointer" onClick={() => signOut()}>
              <button
                type="button"
                className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                <span className="sr-only">Logout</span>
              </button>
            </div>
          </div>
        </div>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const token =
    session &&
    jwt.sign(session, process.env.SECRET || "TEST", {
      expiresIn: "1m",
    });
  return {
    props: { token },
  };
}
