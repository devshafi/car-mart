import {
  Pagination,
  PaginationItem,
  PaginationRenderItemParams,
} from "@mui/material";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { getAsString } from "./../utils/getAsString";
import { forwardRef } from "react";
import { useRouter } from "next/router";

export default function CarPagination({ totalPages }: { totalPages: number }) {
  const { query } = useRouter();

  return (
    <Pagination
      count={totalPages}
      color="secondary"
      page={parseInt(getAsString(query.page!) || "1")}
      renderItem={(item) => (
        <PaginationItem
          component={MaterialUiLink}
          query={query}
          item={item}
          {...item}
        />
      )}
    />
  );
}

export interface MaterialUiLinkProps {
  item: PaginationRenderItemParams;
  query: ParsedUrlQuery;
}

// eslint-disable-next-line react/display-name
const MaterialUiLink = forwardRef<HTMLAnchorElement, MaterialUiLinkProps>(
  ({ item, query, ...props }, ref) => (
    <Link
      href={{ pathname: "/cars", query: { ...query, page: item.page } }}
      shallow
    >
      <a ref={ref} {...props}></a>
    </Link>
  )
);
