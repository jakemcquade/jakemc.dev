"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "./utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

export interface ButtonProps extends React.LabelHTMLAttributes<HTMLLabelElement> {

  }

const Label = React.forwardRef<HTMLLabelElement, ButtonProps>(({ className, ...props }, ref) => (
  <label ref={ref} className={cn(labelVariants(), className)} {...props} />
));

Label.displayName = "FormLabel";
export { Label };