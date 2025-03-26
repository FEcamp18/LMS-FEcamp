import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowLeft, X, Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "h-9 px-4 py-2 bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "h-9 px-4 py-2 bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "h-9 px-4 py-2 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "h-9 px-4 py-2 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground",
        link: "h-9 px-4 py-2 text-primary underline-offset-4 hover:underline",
        back: "h-14 w-14 [&_svg]:size-7 bg-cream rounded-xl flex flex-col text-brown hover:bg-brown hover:drop-shadow-xl hover:text-cream",
        cancel:
          "h-14 w-14 [&_svg]:size-7 rounded-full hover:bg-error active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3)] active:border-none",
        delete:
          "h-14 w-14 [&_svg]:size-7 rounded-full hover:bg-error active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3)] active:border-none",
        download:
          "h-8 w-32 rounded-none bg-light-brown font-prompt text-white " +
          "bg-[url('/image/subject-picture/bg-download-button.webp')] bg-[100%] bg-cover bg-center ",
        sign_in:
          "h-8 w-64 font-inknut text-lg bg-dark-gray text-white hover:bg-brown active:bg-dark-brown",
        board:
          "flex flex-col bg-cream text-brown border-2 border-brown font-prompt rounded-xl hover:bg-brown hover:text-cream hover:drop-shadow-xl active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.3)] active:border-none",
      },
      size: {
        default: "h-14 px-4 py-6",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        sm_icon: "h-10 w-10 [&_svg]:size-5",
      },
    },
    /* defaultVariants: {
      variant: "default",
      size: "default",
    }, */
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {variant === "back" && <ArrowLeft size={28} strokeWidth={2} />}
        {variant === "cancel" && (
          <X size={28} strokeWidth={2} className="text-brown" />
        )}
        {variant === "delete" && (
          <Trash2 size={28} strokeWidth={2} className="text-brown" />
        )}
        {variant === "board" && (
          <>
            {" "}
            <div>
              <div className="ml-3 mt-4 flex items-start text-2xl font-bold">
                ปิด
              </div>
              <div className="mb-4 ml-3 mr-8">ปิดเว็บสำหรับกรณีฉุกเฉิน!!!</div>
            </div>
          </>
        )}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
