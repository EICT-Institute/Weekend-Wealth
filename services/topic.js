const errors = require('../errors');
const db = require('../db/pgQl');
const { combineParams } = require('../utils/genral');

const addOneTopic = (data) => {
  try {
    ['name', 'details', 'subjectId'].forEach((element) => {
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
      text: `INSERT INTO topics(${columns.join(', ')}) VALUES(${positions.join(
        ', '
      )}) RETURNING _id`,
      values,
    };

    return db.query(query);
  } catch (error) {
    throw error;
  }
};

const readManyTopics = async (query) => {
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
    const sortFld = query.sortField ? query.sortField : 'tp.entryDate';
    const sortDirection = Number(query.sortOrder) === 1 ? 'desc' : 'asc';

    let condition = combineParams(theFilter, 'tp');
    if (condition === '') condition = 'tp.deleted_at is null';

    const dbQuery = {
      text: ` SELECT tp._id, tp.name, tp.details, sb.name AS "subject"
              FROM topics tp
              INNER JOIN subjects sb
                   ON tp.subjectId = sb._id
               WHERE   ${condition} AND tp.deleted_at is null
       ORDER BY ${sortFld} ${sortDirection}
       LIMIT ${pageLimit}  OFFSET ${skip}`,
    };

    const getData = await db.query(dbQuery);

    const dbQuery2 = {
      text: `SELECT  _id, COUNT(*) FROM  topics tp WHERE ${condition} GROUP BY _id`,
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

const updateOneTopic = (data, _id) => {
  try {
    if (!data) return true;

    data.updated_at = new Date();

    const columns = [];
    const values = [];
    const positions = [];

    Object.entries(data).forEach(([column, value], index) => {
      columns.push(column);
      values.push(value);
      positions.push(`$${(index += 1)}`);
    });

    values.push(_id);
    const id_position = `$${values.length}`;

    const query = {
      text: `UPDATE topics SET (${columns.join(', ')}) = (${positions.join(
        ', '
      )}) WHERE _id = ${id_position}`,
      values,
    };

    return db.query(query);
  } catch (error) {
    throw error;
  }
};

const deleteOneTopic = (_id) => {
  try {
    const query = {
      text: `UPDATE topics SET deleted_at = NOW()::timestamp WHERE _id = ${_id}`,
    };

    return db.query(query);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addOneTopic,
  readManyTopics,
  updateOneTopic,
  deleteOneTopic,
};
