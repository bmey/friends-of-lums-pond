import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getUrl } from "../components/getUrl";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
import Logo from "../images/logo.png";

export async function GET(context) {
  const posts = await getCollection("blog");
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    customData: `<image>
      <url>${context.site.origin + Logo.src}</url>
      <title>${SITE_TITLE}</title>
      <link>${context.site}</link>
    </image>`,
    items: posts.map((post) => ({
      ...post.data,
      link: getUrl(`/blog/${post.slug}/`),
    })),
  });
}
