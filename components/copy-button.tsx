"use-client";

import { CheckIcon, ClipboardCopyIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CopyToClipboard } from "./citation-form";

// https://github.com/shadcn-ui/ui/blob/13d9693808badd4b92811abac5e18dc1cddf2384/apps/www/components/copy-button.tsx

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  src?: string;
}

export function CopyButton({
  value,
  className,
  src,
  ...props
}: CopyButtonProps) {
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
      className={cn(
        "relative h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
        className
      )}
      onClick={() => {
        CopyToClipboard(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <CheckIcon className="h-3 w-3" />
      ) : (
        <ClipboardCopyIcon className="h-3 w-3" />
      )}
    </Button>
  );
}
