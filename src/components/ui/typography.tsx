import * as React from "react"
import { cn } from "@/lib/utils"

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "list"
  | "code"
  | "lead"
  | "large"
  | "small"
  | "muted"

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: React.ElementType
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "p", as, ...props }, ref) => {
    const Component = as || getDefaultElement(variant)

    return (
      <Component
        ref={ref}
        className={cn(variantClasses[variant], className)}
        {...props}
      />
    )
  }
)

Typography.displayName = "Typography"

const variantClasses: Record<TypographyVariant, string> = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  list: "my-6 ml-6 list-disc [&>li]:mt-2",
  code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground",
}

function getDefaultElement(variant: TypographyVariant): React.ElementType {
  switch (variant) {
    case "h1":
      return "h1"
    case "h2":
      return "h2"
    case "h3":
      return "h3"
    case "h4":
      return "h4"
    case "blockquote":
      return "blockquote"
    case "list":
      return "ul"
    case "code":
      return "code"
    case "p":
    case "lead":
      return "p"
    case "large":
      return "div"
    case "small":
      return "small"
    case "muted":
      return "span"
    default:
      return "p"
  }
}
