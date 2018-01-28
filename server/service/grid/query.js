let pageQuery = async (sequelizeModel, page, params) => {
    let queryNo = parseInt(page.no) || 1;
    let querySize = parseInt(page.size) || 20;
    let grid = {};
    grid.page = {};
    let totalNum = await sequelizeModel.count({where: params || {}});
    grid.page.totalNum = totalNum;
    let totalPage = totalNum % querySize == 0 ? parseInt(totalNum / querySize) : parseInt(totalNum / querySize) + 1;
    grid.page.totalPage = totalPage;
    queryNo = queryNo < 1 ? 1 : queryNo <= totalPage ? queryNo : totalPage == 0 ? 1 : totalPage;
    grid.page.queryNo = queryNo;
    return sequelizeModel.findAll({
        offset: (queryNo - 1) * querySize,
        limit: querySize,
        where: params || {}
    }).then((data) => {
        grid.data = [];
        for (let m = 0; m < data.length; ++m) {
            grid.data.push(data[m].dataValues);
        }
        return grid;
    }, (err) => {
        console.log(err);
        return {};
    });
};

module.exports = {
    pageQuery
};
