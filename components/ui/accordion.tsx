"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;
export const AccordionItem = AccordionPrimitive.Item;

export function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "group flex min-h-14 flex-1 items-center justify-between gap-4 border-b border-border py-4 text-left text-base font-semibold text-foreground transition hover:text-primary-dark",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="size-5 shrink-0 text-muted transition group-data-[state=open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className={cn(
        "overflow-hidden text-muted data-[state=closed]:animate-none data-[state=open]:animate-none",
        className,
      )}
      {...props}
    >
      <div className="pb-5 pt-2">{children}</div>
    </AccordionPrimitive.Content>
  );
}
