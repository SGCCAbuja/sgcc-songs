<div align="center">

[![](./public/cover.png)](https://songs.sgcc.ng)

A collection of songs and hymns from Sovereign Grace Community Church, Abuja.

[![Netlify Status](https://api.netlify.com/api/v1/badges/d1bf82a6-b4cb-41fb-baba-2f50a290773c/deploy-status)](https://app.netlify.com/projects/sgcc-songs/deploys)

</div>

---

## Code Structure

| **Path**    | **Description**       |
| ----------- | --------------------- |
| `/src/app/data/songs.json`          | Data file containing the collection of songs.   |
| `/src/app/song/[id]/page.tsx`       | Dynamic route for displaying individual songs.  |
| `/src/app/types/song.ts`            | Type definitions for songs.                     |
| `/src/app/hooks/favorites.ts`       | Hook for adding songs to a favorite list.       |
| `/src/app/utils/formatSection.ts`   | Utility for formatting song sections.           |
| `/src/app/utils/shareLink.ts`       | Utility for generating shareable links.         |
| `/src/app/globals.css`              | Global CSS styles for the application.          |
| `/src/app/layout.tsx`               | Shared layout for fonts and metadata.           |
| `/src/app/page.tsx`                 | Home page (`/`).                                |

## Songs Database Schema

- **id** (`integer`): Unique identifier for each song.
- **title** (`string`): Title of the song.
- **authors** (`array of strings`): List of authors of the song.
- **year** (`integer` or `null`): Year the song was written; can be null if unknown.
- **verses** (`array of objects`): List of verses in the song.
  - **type** (`string`): Type of the verse, e.g., "verse", "chorus", "bridge", "outro", etc.
  - **number** (`integer`) The order number of the verse within the song.
  - **content** (`string`) The text content of the verse.
 
Example JSON:

```
  {
    "id": 4,
    "title": "You Are Beautiful Beyond Description (I Stand In Awe)",
    "authors": ["Mark Altrogge", "Sovereign Grace Praise"],
    "year": 1986,
    "verses": [
      {
        "type": "verse",
        "number": 1,
        "content": "You are beautiful beyond description\nToo marvelous for words\nToo wonderful for comprehension\nLike nothing ever seen or heard\nWho can grasp Your infinite wisdom?\nWho can fathom the depth of Your love?\nYou are beautiful beyond description\nMajesty, enthroned above"
      },
      {
        "type": "chorus",
        "number": 1,
        "content": "And I stand, I stand in awe of You\nI stand, I stand in awe of You\nHoly God, to whom all praise is due\nI stand in awe of You"
      },
      {
        "type": "verse",
        "number": 2,
        "content": "You are beautiful beyond description\nYet God crushed You for my sin\nIn agony and deep affliction\nCut off that I might enter in\nWho can grasp such tender compassion?\nWho can fathom this mercy so free?\nYou are beautiful beyond description\nLamb of God who died for me"
      }
    ]
  },
```

## Getting Started

To run this application locally, kindly follow the steps below:

1. Install all required dependencies with the `npm install` command (or use `yarn` / `pnpm`).

3. Run the development server with the command `npm run dev`.

4. Open [`http://localhost:3000`](http://localhost:3000) with your browser to see the result.

5. All good! You can start modifying any page, and the app will auto-update.


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
