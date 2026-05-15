FROM node:20-alpine

WORKDIR /app

COPY package.json ./

CMD sh -c "yarn install --frozen-lockfile && yarn build && sh"
