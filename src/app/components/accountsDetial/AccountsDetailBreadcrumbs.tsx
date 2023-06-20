import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box, Link } from '@mui/material';
import { useRouter,usePathname, useSearchParams } from 'next/navigation';


export default function AccountsDetailBreadcrumbs() {
    const router = useRouter();
    function generateBreadcrumbs() {
        const pathName =  usePathname();
        console.log("pathName:",pathName);
        // Remove any query parameters, as those aren't included in breadcrumbs

        const asPathWithoutQuery = pathName.split("?")[0];
    
        // // Break down the path between "/"s, removing empty entities
        // // Ex:"/my/nested/path" --> ["my", "nested", "path"]
        const asPathNestedRoutes = asPathWithoutQuery.split("/")
                                                     .filter(v => v.length > 0);
    
        // // Iterate over the list of nested route parts and build
        // // a "crumb" object for each one.
        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
          // We can get the partial nested route for the crumb
          // by joining together the path parts up to this point.
          const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
          // The title will just be the route string for now
          const title = subpath;
          return { href, title }; 
        })
    
        // Add in a default "Home" crumb for the top-level
        return [{ href: "/", title: "Home" }, ...crumblist];
      }
      const breadcrumbs = generateBreadcrumbs();

    return (
        <Box sx={{ paddingBottom:4}}>
          <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((crumb, idx) => (
            <Link
              key={idx}
              color="inherit"
              href={crumb.href}
              onClick={crumb.href ? undefined : (e) => e.preventDefault()}>{crumb.title}</Link>
            ))}
          </Breadcrumbs>
        </Box>
      );
}