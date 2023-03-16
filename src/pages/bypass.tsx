import { useRouter } from "next/router";
import React from "react";

export default function ByPass() {
  const router = useRouter();
  const { url } = router.query;
  const [counter, setCounter] = React.useState(5);

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer as any);
  }, [counter]);

  React.useEffect(() => {
    if (url) {
      setTimeout(() => {
        window.location.replace(url as string);
      }, 5000);
    }
  }, [url]);

  return (
    <div className="p-2">
      <div className="p-2 text-xl font-semibold bg-slate-300">
        Redirect Notice
      </div>
      <div className="py-3">
        <div className="">
          The previous page is sending you to <a href={url as string}>{url}</a>{" "}
          after {counter} s
        </div>
        <div>
          If you do not want to visit that page, you can{" "}
          <a href="#">return to the previous page</a>
        </div>
      </div>
    </div>
  );
}
