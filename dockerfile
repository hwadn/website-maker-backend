FROM node:18-alpine

# 创建工作目录
RUN mkdir -p /app

# 指定工作目录
WORKDIR /app

# 复制当前代码到/app工作目录
COPY . ./

# npm 源，选用国内镜像源以提高下载速度
RUN npm config set registry https://registry.npmmirror.com

# npm 安装依赖
COPY package.json /app/package.json
RUN cd /app && rm -rf /app/test
RUN cd /app && rm /app/yarn.lock
RUN cd /app && rm -rf /app/node_modules && yarn

# 打包
RUN cd /app && rm -rf /app/dist &&  yarn build

ENV MYSQL_ROOT_PASSWORD $MYSQL_ROOT_PASSWORD
ENV MYSQL_HOST $MYSQL_HOST

# 启动服务
CMD yarn start:prod

EXPOSE 3000
