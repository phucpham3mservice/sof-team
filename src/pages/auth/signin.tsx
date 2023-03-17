import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-200">
      <div className="p-6 border-gray-200 border rounded-lg bg-white shadow-lg flex flex-col justify-center items-center gap-3">
        <div className="flex flex-col items-center">
          <img
            width={80}
            src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Transparent.png"
          />
          <div className="text-sm text-gray-400">
            Login with one of these available google accouunts
          </div>
        </div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              {provider.name === "Google" && (
                <img
                  width={350}
                  src="https://onymos.com/wp-content/uploads/2020/10/google-signin-button-1024x260.png"
                  alt="google-login"
                />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/profile" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
