# Muhammad Humayoun — Backend Developer Portfolio

A responsive static portfolio built with HTML, CSS and vanilla JavaScript. It highlights Laravel MVC, ASP.NET MVC and REST API work, alongside public personal projects and professional experience.

## Included

- Project cards with direct GitHub links for ClinicDesk, SchoolDesk and DriveDesk API.
- Project filters and accessible project-detail dialogs.
- Professional experience, education, verified contact details and LinkedIn/GitHub links.
- Downloadable current CV in assets/Muhammad_Humayoun_CV.pdf.
- Mobile navigation, keyboard focus styles, reduced-motion support and email-copy fallback.
- Relative asset paths that support both a user Pages site and a repository subpath.
- Local CSS/JavaScript, with no package installation, framework, external font or CDN required.

## Preview locally

Extract all files into one folder. Double-click index.html to open it in Chrome or Edge. Keep index.html, styles.css, script.js and assets together. On a local file URL, the email-copy action selects the address for manual copying if the clipboard API is unavailable. Project details and filters work without a local server.

## GitHub Pages

Follow GITHUB-PAGES-ROMAN-URDU.md. Recommended public repository name: **humayoun11.github.io**. With that user-site name, the expected URL after successful deployment is **https://humayoun11.github.io/**. If that repository already exists, update its existing source instead of creating a duplicate. A repository named portfolio instead uses https://humayoun11.github.io/portfolio/.

index.html must be at the root of the selected publishing folder. The .nojekyll file keeps the deployment buildless. Select the branch actually published (normally main) and /(root) in Settings → Pages. No CNAME or custom domain is required.

GitHub Pages serves this portfolio's static files. The three backend applications are linked source repositories; their PHP/.NET services and SQL databases require their own runtime hosting to offer live application URLs.

## Edit content

- index.html: visible copy, contact information, job experience and project links.
- script.js: project-detail text, filtering, navigation and email copy.
- styles.css: colours, typography, spacing and responsive layouts.
- assets/Muhammad_Humayoun_CV.pdf: replace when the CV changes.

The current CV PDF is preserved from the supplied latest CV. Its content has not been rewritten as part of this portfolio update. Add the personal-project GitHub links to that PDF separately if you want a revised CV.

## Verification

Static source checks verify local files/anchors, project and contact links, unique IDs, JSON-LD, CV presence and JavaScript syntax. Browser rendering and interactions need a manual check in Chrome/Edge. The site has not been published to GitHub Pages by this package; publish it using the guide and verify the URL GitHub returns.

The project diagrams are feature overviews, not screenshots of a running application. Personal repositories are described separately from employment work. No form pretends to submit a message; contact buttons open email, telephone, LinkedIn or GitHub directly.
