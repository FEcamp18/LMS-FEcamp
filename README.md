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
npx prisma migrate dev
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
docker volume rm {FE database}
docker compose -f docker-compose.yml up -d

// you have to run prisma migration again
npx prisma migrate dev
pnpm run seed
```

# Convention about git

## Branch and Commit

- Branch name : `<dev name>/<type>/<task name>`
  - ex. tonnam/feat/scan-qrcode
- Commit message : `<type>(<project name>): <description>`
  - แนวทางการเขียน type commit เพิ่มเติม : https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13

## PR Description

**How to Write a PR Description**

1. **Title:**

   - Use a clear, short title (e.g., "`feat/frontend-router-setup`").

2. **Summary:**

   - Briefly explain what the PR does (e.g., "Added routing structure with new `page.tsx` files").

3. **Details:** (optional)

   - List changes in sections (e.g., Camper, Staff, Feedback).
   - Use file paths to show affected areas.

4. **Formatting:**
   - Use bullets or numbers for easy reading.
   - Show dynamic routes with placeholders like `[classname]`. (optional)

Keep it clear and easy to read and then ask to review the pr!

# Project Structure (create by T3 app)

Overall

```
.
├─ prisma
│  └─ schema.prisma
├─ public
│  └─ favicon.ico
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  └─ auth
│  │  │     └─ [...nextauth]
│  │  │        └─ route.ts
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ server
│  │  ├─ auth.ts
│  │  └─ db.ts
│  ├─ styles
│  │  └─ globals.css
│  └─ env.js
├─ .env
├─ .env.example
├─ .eslintrc.cjs
├─ .gitignore
├─ next-env.d.ts
├─ next.config.js
├─ package.json
├─ postcss.config.js
├─ prettier.config.js
├─ README.md
├─ tailwind.config.ts
└─ tsconfig.json
```

in `src`

```
├───app
│   ├───(camper)
│   │   ├───account
│   │   ├───checkin
│   │   └───classroom
│   │       └───[classname]
│   ├───(staff)
│   │   ├───board
│   │   ├───camperinfo
│   │   └───tutor
│   │       └───[subjectName]
│   ├───api
│   │   └───auth
│   │       └───[...nextauth]
│   ├───feedback
│   │   ├───view
│   │   └───[classname]
│   └───login
├───components
│   └───ui
├───lib
├───server
│   └───auth
├───styles
└───types
```

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
