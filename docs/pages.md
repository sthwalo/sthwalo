# Pages

| Route        | Page           | Description                                              |
|:-------------|:---------------|:---------------------------------------------------------|
| `/`          | Home           | Hero, FIN spotlight, services overview, delivered projects|
| `/about`     | About          | Immaculate's story, values, career timeline (2011-2025)  |
| `/services`  | Services       | Full-stack dev, cloud/DevOps, security, financial systems|
| `/portfolio` | Portfolio      | FIN deep dive, case study, 6 delivered client websites   |
| `/contact`   | Contact        | Form (Express API), email, location, LinkedIn            |
| `/blog`      | Blog           | Content hub with posts, categories, and social sharing   |
| `/blog/:slug`| BlogPost       | Individual blog post with SEO metadata and sharing       |
| `/admin`     | Admin          | Blog editor — sign in, write, preview, publish. `noindex` |
| `/privacy`   | Privacy        | Privacy policy (legal page layout)                       |
| `/terms`     | Terms          | Terms of use (legal page layout)                         |
| `/cookies`   | Cookies        | Cookie policy (legal page layout)                        |
| `/paia`      | Paia           | PAIA manual (legal page layout)                          |
| `/refunds`   | Refunds        | Refund and cancellation policy (legal page layout)       |

## Removed routes

`/resources` and `/demo` were removed in the blog-admin change. The Resources page
front-loaded seven manual guides, nine animated tours and a handbook PDF — enough
reading that a visitor could spend an hour there without ever signing up — and its
seven "guides" were each a one-line pointer to a blog post that already existed.
The writing they pointed at is the content, and it lives at `/blog`.

Everything that linked to `/resources` now links to `/blog` or to the specific post
it was really offering. `/demo` was a bare redirect to `/resources`.
