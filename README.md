# Run the Project 🏃🏻‍♀️‍➡️

0. if you pull project for the first time. read 'Project Setup'
1. if you just fetch git history.
   - (if new library is added) : `pnpm install` to install new lib.
   - (if database is changes) : `npx prisma migrate dev` to migrate database
   - (if new data is seeded) : run `node prisma/{seed file}` for example `node prisma/seed.js`
2. if you already setting up project. Just use
   ```
   docker-compose up -d
   pnpm run dev
   ```
   PS : if port being in use. `docker ps -a` to see what container id using that port. Then use `docker stop {container_id}` to stop it.

# Project Setup

- copy `.env.example` then change name to `.env`
- run these command

```
pnpm install
docker-compose up -d
pnpm add @prisma/client prisma
pnpm prisma generate
node prisma/seed/init_seed.js
```

- when you change prisma schmema and want to migrate it

```
npx prisma migrate dev
node prisma/seed/{your_seed}.js
```

### Techs / Frameworks / Libs

- Frontend -> Next.js (TailwindCSS with ShadCN)
- Backend -> Next.js
- Database -> PostgreSQL
- ORM (object-relational mapping) -> Prisma

### (Danger Zone!!!) To delete data base and start from scratch

```
docker-compose -f docker-compose.yml down
docker volume ls
docker volume rm 2tinkerbread_postgres-data
docker compose -f docker-compose.yml up -d

// you have to run prisma migration again
npx prisma migrate dev
pnpm run seed
```

# Convention about git

- Branch name : <dev name>/<type>/<task name>
  - ex. tonnam/feat/scan-qrcode
- Commit message : <type>(<project name>): <description>
- แนวทางการเขียน type commit เพิ่มเติม : https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
