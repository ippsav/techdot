import { Navbar } from "../components/Navbar";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
const Index = () => (
  <>
    <Navbar />
  </>
);

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
