FROM node
LABEL maintainer="tom.banchereau@viacesi.fr"

ENV NODE_ENV production

ADD package.json .
ADD package-lock.json .

RUN npm i --production

ADD bot bot
ADD ressources ressources

CMD ["node","bot"]
