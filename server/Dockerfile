FROM node
COPY ["package.json", "yarn.lock", "./"]
COPY ./.env.local ./
RUN yarn
COPY . .
CMD ["yarn", "start"]