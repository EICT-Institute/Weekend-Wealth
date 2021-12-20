const errors = require('../errors');
const db = require('../db/pgQl');
const { combineParams } = require('../utils/genral');

const addOneSuggestion = (data) => {
  try {
    ['subTopicId', 'suggestion'].forEach((element) => {
      if (!data[element])
        throw new errors.AuthenticationError(`Supplie field named ${element}.`);
    });

    const columns = [];
    const values = [];
    const positions = [];

    Object.entries(data).forEach(([column, value], index) => {
      columns.push(column);
      values.push(value);
      positions.push(`$${(index += 1)}`);
    });

    const query = {
      text: `INSERT INTO suggestions(${columns.join(', ')}) VALUES(${positions.join(
        ', '
      )}) RETURNING _id`,
      values,
    };

    return db.query(query);
  } catch (error) {
    throw error;
  }
};

const readManySuggestions = async (query) => {
  try {
    if (!query.pageNumber) query.pageNumber = 1;

    const theFilter = JSON.parse(JSON.stringify(query));
    delete theFilter.pageNumber;
    delete theFilter.pageLimit;
    delete theFilter.sortField;
    delete theFilter.sortOrder;

    const { pageNumber } = query;
    const pageLimit = query.pageLimit || 50;
    const skip = pageNumber * pageLimit - pageLimit;
    const sortFld = query.sortField ? query.sortField : 'sg.entryDate';
    const sortDirection = Number(query.sortOrder) === 1 ? 'desc' : 'asc';

    let condition = combineParams(theFilter, 'sg');
    if (condition === '') condition = 'sg.deleted_at is null';

    const dbQuery = {
      text: ` SELECT sg._id, sg.suggestion, st.title
              FROM suggestions sg
              INNER JOIN sub_topics st
                ON st._id = sg.subTopicId
               WHERE   ${condition} AND sg.deleted_at is null
       ORDER BY ${sortFld} ${sortDirection}
       LIMIT ${pageLimit}  OFFSET ${skip}`,
    };

    const getData = await db.query(dbQuery);

    const dbQuery2 = {
      text: `SELECT  _id, COUNT(*) FROM  suggestions sg WHERE ${condition} GROUP BY _id`,
    };
    const count = await db.query(dbQuery2);

    const pageCount = Math.ceil(count.rowCount / pageLimit);

    return {
      data: getData.rows,
      pagination: {
        pageNumber,
        pageLimit,
        pageCount,
        totalCount: count.rowCount,
        sortOrder: Number(query.sortOrder) || 1,
        sortField: query.sortField || 'entryDate',
      },
    };
  } catch (error) {
    throw error;
  }
};

const deleteOneSuggestion = (_id) => {
  try {
    const query = {
      text: `UPDATE suggestions SET deleted_at = NOW()::timestamp WHERE _id = ${_id}`,
    };

    return db.query(query);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addOneSuggestion,
  readManySuggestions,
  deleteOneSuggestion,
};
