// Override PageProps to match App Router behavior
import 'next';

declare module 'next' {
  export type PageProps<P = Record<string, string>> = {
    params: P;
    searchParams?: Record<string, string | string[] | undefined>;
  };
}