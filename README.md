<div align="center">

[![](./public/cover.png)](https://songs.sgcc.ng)

A collection of hymns sang at Sovereign Grace Community Church, Abuja.

</div>

---

## Code Structure

| **Path**    | **Description**       |
| ----------- | --------------------- |
| `/src/app/data/hymns.ts`           | Data file containing the collection of hymns.     |
| `/src/app/hymn/[id]/page.tsx`      | Dynamic route for displaying individual hymns.  |
| `/src/app/types/hymn.ts`           | Type definitions for hymns.                     |
| `/src/app/utils/formatSection.ts`  | Utility for formatting hymn sections.           |
| `/src/app/utils/shareLink.ts`      | Utility for generating shareable links.         |
| `/src/app/globals.css`             | Global CSS styles for the application.          |
| `/src/app/layout.tsx`              | Shared layout for fonts and metadata.           |
| `/src/app/page.tsx`                | Home page (`/`).                                |

## Getting Started

To run this application locally, kindly follow the steps below:

1. Install all required dependencies with the `npm install` command (or use `yarn` / `pnpm`).

3. Run the development server with the command `npm run dev`.

4. Open [`http://localhost:3000`](http://localhost:3000) with your browser to see the result.

5. All good! You can start modifying any page and the app will auto-update.


## Contributors Guide

1. Fork [this repository](https://github.com/SGCCAbuja/sgcc-songs) (learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository like so:

```bash
git clone https://github.com/<your username>/sgcc-songs.git && cd sgcc-songs
```

3. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

4. Someone will attend to your pull request soon and provide some feedback.

## License

This repository is published under the [GPL v3](LICENSE) license.
