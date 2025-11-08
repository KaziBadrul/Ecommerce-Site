import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const GetStarted = () => {
  return (
    <div>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
      <Link href="/signup">
        <Button>Sign Up</Button>
      </Link>
    </div>
  );
};

export default GetStarted;
