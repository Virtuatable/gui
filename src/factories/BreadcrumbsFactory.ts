import router from '@/router';

interface Route {
  path: string;
}

export interface Breadcrumb {
  text: string;
  disabled: boolean;
  href: string;
}

export default class BreadcrumbsFactory {
  public static fromRoute(route: Route) {
    let p: string = '';
    const elements: Array<string> = route.path.split('/');
    const crumbs: Array<Breadcrumb> = [];
    elements.forEach((part: string) => {
      p = p == '/' ? `/${part}` : `${p}/${part}`
      crumbs.push(this.match(p, false));
    });
    return crumbs;
  }

  public static match(path: string, disabled: boolean): Breadcrumb {
    const matched: any = router.match(path);
    console.log(matched);
    const crumb: Breadcrumb = {
      href: path,
      text: matched.params.id || matched.name,
      disabled: disabled
    }
    return crumb
  }
}