# EasySite

EasySite is a fork-and-go personal website template for GitHub Pages. It gives you a polished personal website plus a built-in no-code admin panel, so you can update your content without editing code files.

There is no backend to deploy. The live website is `index.html`, the admin panel is `admin.html`, and your content lives in `_data/*.json`. When you save from the admin panel, EasySite writes those JSON files and uploaded assets directly to your GitHub repository using the GitHub Contents API.

## What You Get

- A static personal website that works on GitHub Pages.
- A browser-based admin panel at `/admin.html`.
- Content stored in simple JSON files under `_data/`.
- Direct saves to your fork through a GitHub Personal Access Token.
- Drag-and-drop section ordering.
- Optional sections you can show or hide without deleting content.
- Image, logo, resume, CV, and notes PDF uploads.
- Optional Spotify recently played integration through GitHub Actions.

## How It Works

EasySite has three main parts:

- `index.html` is the public website visitors see.
- `admin.html` is the private editing interface you use to manage the site.
- `_data/*.json` stores the content that both files read and write.

The admin panel asks for your GitHub username, repository name, branch, and a Personal Access Token. Those values are stored only in your browser's `localStorage`. When you click **Save All**, the admin commits updates directly to the selected branch with messages like `cms: update _data/hero.json`.

## Quick Start

### 1. Fork This Repository

Click **Fork** on GitHub and create your own copy of the repo.

After forking, your repository URL will look like one of these:

- `https://github.com/YOUR-USERNAME/EasySite`
- `https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io`
- `https://github.com/YOUR-USERNAME/my-site`

You can rename the repository if you want. If you use `YOUR-USERNAME.github.io`, GitHub Pages can publish it at `https://YOUR-USERNAME.github.io/`. Otherwise, it will usually publish at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

### 2. Enable GitHub Pages

In your forked repository:

1. Go to **Settings**.
2. Open **Pages** in the left sidebar.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch.
5. Select `/ (root)` as the folder.
6. Click **Save**.

GitHub will give you a public site URL. It can take a minute or two for the first deploy to finish.

If your site loads but the content sections are empty, make sure GitHub Pages is serving the `_data` folder. If your fork does not already include an empty `.nojekyll` file, add one at the repository root so GitHub Pages serves underscore-prefixed folders as static files.

### 3. Create a GitHub Personal Access Token

The admin panel needs permission to save changes to your repository.

For a public fork, create a classic token with the smallest required scope:

1. Go to GitHub.
2. Open **Settings**.
3. Go to **Developer settings**.
4. Open **Personal access tokens**.
5. Choose **Tokens (classic)**.
6. Click **Generate new token (classic)**.
7. Give it a name, such as `EasySite Admin`.
8. Choose an expiration. For easiest use, choose **No expiration**, or choose a date and remember to renew it later.
9. Under **Scopes**, check only `public_repo`.
10. Click **Generate token**.
11. Copy the token immediately. GitHub will not show it again.

Keep this token private. Do not commit it to the repo, paste it in public, or share screenshots that reveal it.

### 4. Open the Admin Panel

Go to:

```text
https://YOUR-USERNAME.github.io/REPO-NAME/admin.html
```

If your repository is named `YOUR-USERNAME.github.io`, go to:

```text
https://YOUR-USERNAME.github.io/admin.html
```

Sign in with:

- **GitHub Username / Owner:** your GitHub username or organization name.
- **Repository Name:** the exact name of your fork.
- **Branch:** usually `main`; use a feature branch such as `feat/awards-section` while testing changes.
- **Personal Access Token:** the token you created above.

After sign-in, EasySite loads your current `_data` files from GitHub.

### 5. Edit and Save

Use the sidebar to edit your content. Required fields are marked in the admin. When you are done:

1. Click **Preview** to see the site in a modal.
2. Click **Save All**.
3. Wait for the success message.
4. Refresh your public site after GitHub Pages redeploys.

Most changes appear after GitHub Pages finishes rebuilding. This is usually quick, but can take a few minutes.

## Admin Sections

EasySite includes a pinned **Hero** section, an **About** section enabled by default, and many optional sections that you can turn on when you need them.

### Hero

The top of your homepage. Manage:

- Tagline
- Name
- Hero description

These values are saved to `_data/hero.json`.

### About

Your profile and social links. Manage:

- Profile photo
- Bio
- LinkedIn, GitHub, email, YouTube, Spotify, Instagram, Facebook, X, and Reddit links

Blank social links are hidden automatically. About content is saved to `_data/aboutme.json`, and uploaded profile photos are saved under `assets/images/`.

### Experience

Work, internships, leadership roles, and other professional experience. Manage:

- Company
- Role
- Start and end dates
- Bullet points
- Optional company logo

Experience entries are saved to `_data/experience.json`. Logos are uploaded under `assets/images/logos/`.

### Education

Schools, degrees, coursework, and academic details. Manage:

- Institution
- Location
- Degree
- Start and end dates
- GPA
- Relevant coursework
- Optional school logo

Education entries are saved to `_data/education.json`.

### Projects

Project cards for software, research, design, hardware, hackathons, or anything else you want to showcase. Manage:

- Project name
- Start and end dates
- Description
- Tech tags
- GitHub link
- Live website link
- Devpost link
- Demo or YouTube link
- Optional image carousel

Projects are saved to `_data/projects.json`. Project images are uploaded under `assets/images/projects/`.

### Resume

Upload a resume PDF. The file is saved to:

```text
assets/files/resume.pdf
```

The resume metadata is saved to `_data/resume.json`.

### CV

Upload a longer academic or professional CV PDF. The file is saved to:

```text
assets/files/cv.pdf
```

The CV metadata is saved to `_data/cv.json`.

### Hobbies

Add personal interests with images. Manage:

- Hobby label
- Emoji
- Short description
- Image carousel

Hobbies are saved to `_data/hobbies.json`. Images are uploaded under `assets/images/hobbies/`.

### FAQ

Add frequently asked questions for visitors. Manage:

- Section heading
- Section description
- Questions and answers

FAQ content is saved to `_data/faq.json`.

### Trips

Show places you have visited and trip photo carousels. Manage:

- Map pins with place name, emoji, latitude, and longitude
- Trip label
- Trip emoji
- Trip description
- Trip image carousel

Trip data is saved to `_data/trips.json`, and map pins are saved to `_data/map.json`. The admin includes a link to latlong.net, and you can also get coordinates from Google Maps by right-clicking a place and choosing **What's here?**

### My Notes

Share class notes, reading notes, study guides, or other PDFs. Manage:

- Section heading
- Section description
- Note title
- Course or subject
- Description
- PDF upload

Notes are saved to `_data/notes.json`. Uploaded PDFs are saved under `assets/files/notes/`.

### Blog

Add lightweight writing cards that can link to full posts elsewhere. Manage:

- Section heading
- Section description
- Post title
- Date
- Summary
- Tags
- Optional link to the full post

Blog content is saved to `_data/blog.json`.

### Certifications

List licenses, certificates, and credentials. Manage:

- Section heading
- Certification name
- Issuer
- Date issued
- Expiry date
- Credential URL

Certifications are saved to `_data/certifications.json`.

### Awards

Show honors, scholarships, hackathon wins, and other recognition. Manage:

- Section heading
- Award title
- Issuer or organization
- Date
- Description
- Optional link

Awards are saved to `_data/awards.json`.

### Research

Show research work, publications, posters, lab roles, or academic projects. Manage:

- Section heading
- Section description
- Title
- Your role
- Institution
- Advisor
- Start and end dates
- Abstract or description
- Tags
- Paper, poster, or project link

Research content is saved to `_data/research.json`.

### Gear

Show your setup, tools, desk items, hardware, software, or everyday equipment. Manage:

- Section heading
- Section description
- Item name
- Category
- Description
- Optional link

Gear content is saved to `_data/gear.json`.

### Spotify

Show recently played Spotify tracks. This section is optional and uses GitHub Actions to update `_data/spotify.json`.

To set it up:

1. Create an app at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard).
2. Set the redirect URI to `http://localhost:8888/callback`.
3. Copy your Spotify Client ID and Client Secret.
4. Run `node scripts/get-spotify-token.js` locally to get a refresh token.
5. Add these GitHub repository secrets: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN`.
6. Enable workflows from your repository's **Actions** tab.

The update script commits refreshed track data to `_data/spotify.json`.

### Settings

Customize the background animation. Available effects:

- Particles + Lines
- Floating Particles
- Ripples
- None

Settings are saved to `_data/settings.json`.

## Showing, Hiding, and Reordering Sections

The admin sidebar has two areas:

- **Live Sections:** sections shown on your public website.
- **Hidden:** sections saved in your repo but not shown publicly.

Drag sections between these areas to control what appears on the site. Drag sections within **Live Sections** to change their order. The **Hero** section is pinned at the top and cannot be moved.

The section layout is saved to `_data/layout.json`.

## Uploads

The admin can upload files directly to your repository:

- Profile photo: `assets/images/profile.jpg`
- Experience and education logos: `assets/images/logos/`
- Project images: `assets/images/projects/`
- Hobby images: `assets/images/hobbies/`
- Trip images: `assets/images/trips/`
- Resume PDF: `assets/files/resume.pdf`
- CV PDF: `assets/files/cv.pdf`
- Notes PDFs: `assets/files/notes/`

Images are cropped in the browser before upload. Supported image types include JPG, PNG, and WebP. Resume, CV, and notes uploads expect PDF files.

## Editing Content Manually

You usually do not need to edit files by hand, but you can. Each section maps to a JSON file in `_data/`. For example:

- `_data/hero.json` controls the homepage hero text.
- `_data/aboutme.json` controls your About section and social links.
- `_data/projects.json` controls project cards.
- `_data/layout.json` controls which sections are live or hidden.

If you edit JSON manually, make sure the file stays valid JSON. A missing comma or quote can prevent that section from loading.

## Local Preview

Because the site fetches JSON files from `_data/`, open it through a local web server instead of double-clicking `index.html`.

From the repository folder, you can run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

For the admin panel:

```text
http://localhost:8000/admin.html
```

Local admin saves still write to the GitHub repository you enter on the login screen.

## Security Notes

- Your Personal Access Token is stored in your browser's `localStorage`, not in the repository.
- Anyone with your token can write to the repositories allowed by that token.
- Use the narrowest scope that works. For a public fork, `public_repo` is enough.
- Do not use the admin panel on shared or untrusted computers.
- If your token is exposed, revoke it in GitHub settings and create a new one.
- Signing out of the admin clears the saved owner, repo, and token from that browser.

## Troubleshooting

### The admin says the repository was not found or the token is invalid

Check that:

- The owner is your exact GitHub username or organization.
- The repository name is exact, including capitalization.
- The token has permission to write to that repository.
- The token has not expired.
- For public repositories, the token includes `public_repo`.

### My public site does not show my latest edits

GitHub Pages may still be rebuilding. Wait a minute, then refresh. You can also check your repository's **Actions** or **Pages** deployment status if enabled.

### The site loads, but content sections are blank

Check that the `_data` files exist in your repository and contain valid JSON. Also make sure GitHub Pages is serving `_data`; if needed, add an empty `.nojekyll` file at the repository root.

### Save All fails

Read the error shown near the Save All button. Common causes are missing required fields, an expired token, a renamed repository, or a token without write permission.

If you are saving to a feature branch, make sure that branch has already been pushed to GitHub and contains the `_data` folder.

### Uploaded images or PDFs do not appear immediately

Uploads are committed to the repository first, then served by GitHub Pages. Give GitHub Pages a little time to rebuild, then refresh the page.

## Repository Structure

```text
.
|-- index.html              # Public website
|-- admin.html              # No-code admin panel
|-- _data/                  # JSON content files
|-- scripts/                # Optional Spotify helper scripts
|-- 404.html                # Not found page
|-- LICENSE
`-- README.md
```

## License

EasySite is open source. See `LICENSE` for details.
