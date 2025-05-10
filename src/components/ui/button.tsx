import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-[#0F172A] text-white border border-gray-700 shadow-md hover:scale-105 hover:border-[#3B82F6] hover:shadow-[0_0_8px_2px_#3B82F6]",
  {
    variants: {
      variant: {
        default:
          "bg-[#0F172A] text-white border border-gray-700 hover:bg-[#1E293B] hover:border-[#3B82F6] hover:shadow-[0_0_8px_2px_#3B82F6]",
        destructive:
          "bg-red-500 text-white border border-red-700 hover:bg-red-600 hover:border-red-400 hover:shadow-[0_0_8px_2px_#ff3b3b]",
        outline:
          "border border-[#3B82F6] bg-transparent text-[#3B82F6] hover:bg-[#1E293B] hover:text-white hover:shadow-[0_0_8px_2px_#3B82F6]",
        secondary:
          "bg-[#1E293B] text-white border border-gray-700 hover:bg-[#3B82F6] hover:text-white hover:shadow-[0_0_8px_2px_#3B82F6]",
        ghost: "bg-transparent text-white hover:bg-[#1E293B] hover:shadow-[0_0_8px_2px_#3B82F6]",
        link: "text-[#3B82F6] underline-offset-4 hover:underline hover:text-white",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
