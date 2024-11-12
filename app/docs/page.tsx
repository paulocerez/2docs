import React from "react";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
}) as any;

import spec from "@/swagger";

export default function ApiDocs() {
  return <SwaggerUI spec={spec} />;
}
