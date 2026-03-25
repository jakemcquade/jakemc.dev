export type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];

export interface Variants {
  [key: string]: {
    [key: string]: string;
  };
}

export interface Options {
  variants: Variants;
  defaultVariants: {
    [key: string]: string;
  };
}
