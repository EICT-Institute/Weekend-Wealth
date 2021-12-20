const errors = require('../errors');
const db = require('../db/pgQl');
const { combineParams } = require('../utils/genral');

const addOneSubject = (data) => {
  try {
    ['name', 'details'].forEach((element) => {
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
      text: `INSERT INTO subjects(${columns.join(', ')}) VALUES(${positions.join(
        ', '
      )}) RETURNING _id`,
      values,
    };

    return db.query(query);
  } catch (error) {
    throw error;
  }
};

const readManySubjects = async (query) => {
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
    const sortFld = query.sortField ? query.sortField : 'entryDate';
    const sortDirection = Number(query.sortOrder) === 1 ? 'desc' : 'asc';

    let condition = combineParams(theFilter);
    if (condition === '') condition = 'deleted_at is null';

    const dbQuery = {
      text: ` SELECT _id, name, details
              FROM subjects 
               WHERE   ${condition} AND deleted_at is null
       ORDER BY ${sortFld} ${sortDirection}
       LIMIT ${pageLimit}  OFFSET ${skip}`,
    };

    const getData = await db.query(dbQuery);

    const dbQuery2 = {
      text: `SELECT  _id, COUNT(*) FROM  subjects WHERE ${condition} GROUP BY _id`,
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

const updateOneSubject = (data, _id) => {
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
      text: `UPDATE subjects SET (${columns.join(', ')}) = (${positions.join(
        ', '
      )}) WHERE _id = ${id_position}`,
      values,
    };

    return db.query(query);
  } catch (error) {
    throw error;
  }
};

const deleteOneSubject = (_id) => {
  try {
    const query = {
      text: `UPDATE subjects SET deleted_at = NOW()::timestamp WHERE _id = ${_id}`,
    };

    return db.query(query);
  } catch (error) {
    throw error;
  }
};

/**@@ - serach by name */
const searchSubjectByName = async (string) => {
  try {
    const query = {
      text: `SELECT _id, name, details, entryDate FROM subjects 
      WHERE  
          "name" like '%${string}%'
       `,
    };

    const searchData = await db.query(query);
    return searchData.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addOneSubject,
  readManySubjects,
  updateOneSubject,
  deleteOneSubject,
  searchSubjectByName,
};
