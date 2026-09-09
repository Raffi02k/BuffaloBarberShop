import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { getMetadata,getStructuredData } from "../content/seo";
import { site } from "../content/siteContent";
export function PageMeta() {
  const { pathname }=useLocation();
  useEffect(() => {
    const meta=getMetadata(pathname),canonical=`${site.url}${meta.path==='/'? '/':meta.path}`;
    document.title=meta.title;
    const update=(attribute: 'name'|'property',key: string,value: string) => {
      let node=document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if(!node) {
        node=document.createElement('meta');
        node.setAttribute(attribute,key);
        document.head.appendChild(node);
      }
      node.content=value;
    };
    update('name','description',meta.description);
    update('name','robots',meta.noindex? 'noindex,follow':'index,follow');
    update('property','og:title',meta.title);
    update('property','og:description',meta.description);
    update('property','og:url',canonical);
    update('property','og:image',`${site.url}${meta.image}`);
    update('property','og:type','website');
    update('property','og:locale','sv_SE');
    update('property','og:site_name',site.name);
    update('name','twitter:title',meta.title);
    update('name','twitter:description',meta.description);
    update('name','twitter:image',`${site.url}${meta.image}`);
    update('name','twitter:card','summary_large_image');
    let link=document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if(!link) {
      link=document.createElement('link');
      link.rel='canonical';
      document.head.appendChild(link);
    }
    link.href=canonical;
    let schema=document.getElementById('salon-schema');
    const data=getStructuredData(meta.path);
    if(data) {
      if(!schema) {
        schema=document.createElement('script');
        schema.id='salon-schema';
        schema.setAttribute('type','application/ld+json');
        document.head.appendChild(schema);
      }
      schema.textContent=JSON.stringify(data);
    }
    else
      schema?.remove();
  },[pathname]);
  return null;
}
