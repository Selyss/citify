"use-client";

import * as React from "react";

import { Button } from "@/components/ui/button";

// https://github.com/shadcn-ui/ui/blob/13d9693808badd4b92811abac5e18dc1cddf2384/apps/www/components/copy-button.tsx

export function CopyButton() {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);
  return (
    <Button
      size="icon"
      variant="ghost"
      className="relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:size-3"
      onClick={() => {}}
    ></Button>
  );
}
