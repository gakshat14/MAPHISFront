FROM node:16 AS install_and_build

# defining the metadata
LABEL author="Akshat Gupta <akshat.gupta.2021@bristol.ac.uk>"
LABEL maintainer="MAPHIS"

# defining user to avoid using root
USER node

# creating directory
COPY --chown=node:node . /home/node/code/

# change workdir allowing us to run commands in that directory
WORKDIR /home/node/code

RUN ls

# install the dependiencies and 
# store it in a folder named node_modules
RUN npm set-script postinstall ""
RUN npm ci

# now let's build the app
RUN npm run build

# here we are just creating the build object
# to avoid large size
FROM node:slim

WORKDIR /home/node/code

COPY --from=install_and_build /home/node/code/dist .

# install express required to start our server
RUN npm install express

ENTRYPOINT ["node", "server.js"]

