# Deploying to Cloudflare Pages for free

This site is a static Astro build. Cloudflare Pages' free plan is sufficient for the MVP. The canonical production address is `cameronhildebrandt.dev`; `chil.dev` can redirect to it.

## 1. Put the project on GitHub

Create a GitHub repository, commit this project, and push the branch you want to deploy (usually `main`). Do not commit `node_modules` or `dist`.

## 2. Set up Cloudflare DNS

1. Create or sign in to a [Cloudflare account](https://dash.cloudflare.com/sign-up).
2. In **Websites**, choose **Add a site** and enter `chil.dev`. Choose the Free plan.
3. Cloudflare will show two assigned nameservers. At the domain registrar, replace the existing nameservers with those exact values. Wait for Cloudflare to report the zone as active.
4. Repeat this process for `cameronhildebrandt.dev`, because it is the canonical domain used by the site metadata. Add `cameronhildebrandt.ca` too if you plan to redirect it.

No manual A, AAAA, or CNAME record is needed for a Pages custom domain: Cloudflare creates the required record when the domain is attached to the Pages project. Remove conflicting records for a hostname before attaching it.

## 3. Create the Pages project

1. In Cloudflare, go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Authorize GitHub, select the repository, then choose **Begin setup**.
3. Set **Production branch** to `main` (or the branch you use).
4. Set **Build command** to `yarn build`.
5. Set **Build output directory** to `dist`.
6. Use the default Node version offered by Cloudflare (Node 20+). If you set an environment variable, set `NODE_VERSION` to `22` to match local development.
7. Click **Save and Deploy**.

Cloudflare will provide a `*.pages.dev` preview URL after the first successful build.

## 4. Attach the canonical custom domain

1. Open the Pages project → **Custom domains** → **Set up a custom domain**.
2. Add `cameronhildebrandt.dev` and follow the prompt. Since the zone is on Cloudflare, accept the DNS record it creates.
3. Optionally add `www.cameronhildebrandt.dev` and configure a redirect to the apex in **Rules** → **Redirect Rules**.
4. Cloudflare provisions HTTPS automatically. Wait for the certificate status to become active, then open `https://cameronhildebrandt.dev` and verify the lock icon, homepage, `/projects/`, `/resume/`, `/robots.txt`, and `/sitemap-index.xml`.

## 5. Make chil.dev redirect

For this MVP, create a Cloudflare **Redirect Rule** in the `chil.dev` zone:

1. Go to **Rules** → **Redirect Rules** → **Create rule**.
2. Match all requests with hostname equal to `chil.dev` (and optionally `www.chil.dev`).
3. Use a static 301 redirect to `https://cameronhildebrandt.dev` and preserve the path/query string if Cloudflare offers that option.

Verify `https://chil.dev` lands on the canonical site with HTTPS. You can make `cameronhildebrandt.ca` a similar redirect if desired.

## Ongoing deployments and previews

Every push to the production branch automatically deploys to the live custom domain. Pull requests and non-production branches receive unique Pages preview deployments; use those URLs to review changes before merging.

## Permanent keyword redirects

Cloudflare Pages reads the generated [public/_redirects](public/_redirects) file from the deployed static output. It currently provides permanent `301` redirects for `/github` and `/linkedin`; no Worker, database, or additional Cloudflare product is required.

To add another short link, add one property in [src/data/redirects.json](src/data/redirects.json):

```json
"keyword": "https://destination.example"
```

Commit and push the change. After Pages deploys, verify it with `curl -I https://cameronhildebrandt.dev/keyword`.
