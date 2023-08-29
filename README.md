# Page Dumper

A very simple web system for crawling and scraping websites, where we provide scripts directly in the browser. This allows you to instantly download data from any website, without creating a project for a single scrape.

## Security Concerns

For the sake of simplicity, the application assumes that "admins are good people". Currently, "eval" is used for executing scripts, which is very insecure and this application should never be shared with people you do not trust. I also recommend hosting it only on an internal server.

## Screens

![](/public/screens//Screen%201.png)
![](/public/screens//Screen%202.png)
![](/public/screens//Screen%203.png)
![](/public/screens//Screen%204.png)
![](/public/screens//Screen%205.png)

## Roadmap

-   [ ] Publish docker-image
-   [ ] Declare scrape and scrapes data visualization
-   [ ] Puppeteer

## How to run dev

```bash
yarn dev
```

## How to build

```bash
yarn build

yarn start
```

## To start database

```bash
docker-compose up -d
```

## Contribution

Feel free to make issues and pull request. Any help in the development of the application will be appreciated.
