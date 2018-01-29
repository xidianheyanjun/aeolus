export default {
  mode: "dev",
  homePagePath: "/home/index",
  resource: {
    pageQuery: "http://localhost:3000/user/query/{module}",
    gridRemove: "http://localhost:3000/user/remove/{module}",
    queryData: "http://localhost:3000/user/query/{module}/{id}",
    save: "http://localhost:3000/user/save/{module}",
    update: "http://localhost:3000/user/update/{module}/{id}",
    queryDatasource: "http://localhost:3000/user/query/queryDatasource"
  }
};
