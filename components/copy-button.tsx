"use-client";

import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  const { toast } = useToast();
  async function copyToClipboard(citation: string) {
    if (typeof ClipboardItem !== "undefined") {
      const html = new Blob([citation], { type: "text/html" });
      // TODO: add plain text fallback
      const data = new ClipboardItem({ "text/html": html });
      await navigator.clipboard.write([data]);
    }
  }

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
        "h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
        className
      )}
      onClick={() => {
        copyToClipboard(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <CopyIcon className="h-4 w-4" />
      )}
    </Button>
  );
}
