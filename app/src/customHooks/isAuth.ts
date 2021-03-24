import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

export default function isAuth(page?: string) {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  useEffect(() => {
    if (!data?.me && !fetching && router.pathname !== "/") {
      page = router.pathname;
      router.replace(`/login?nextpage=${page}`);
    } else if (
      typeof page === "string" &&
      router.pathname === "/" &&
      data?.me
    ) {
      router.replace(page);
    }
  }, [router, data, fetching]);
}
