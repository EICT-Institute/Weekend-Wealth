const errors = require('../errors');
const db = require('../db/pgQl');
const { combineParams } = require('../utils/genral');

const addOneSubTopic = (data) => {
  try {
    ['title', 'topicId', 'theory'].forEach((element) => {
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
      text: `INSERT INTO sub_topics(${columns.join(', ')}) VALUES(${positions.join(
        ', '
      )}) RETURNING _id`,
      values,
    };

    return db.query(query);
  } catch (error) {
    throw error;
  }
};

const readManySubTopics = async (query) => {
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
    const sortFld = query.sortField ? query.sortField : 'st.entryDate';
    const sortDirection = Number(query.sortOrder) === 1 ? 'desc' : 'asc';

    let condition = combineParams(theFilter, 'st');
    if (condition === '') condition = 'st.deleted_at is null';

    const dbQuery = {
      text: ` SELECT st._id, st.title, st.theory, st.imageUrl, 
                 st.entryDate AS "pulicationDate",
                 tp.name AS "topic",
                 sb.name AS "subject"
              FROM sub_topics st
                INNER JOIN topics tp
                 ON st.topicId = tp._id
                INNER JOIN subjects sb
                 ON tp.subjectId = sb._id
                WHERE   ${condition} AND st.deleted_at is null
       ORDER BY ${sortFld} ${sortDirection}
       LIMIT ${pageLimit}  OFFSET ${skip}`,
    };

    const getData = await db.query(dbQuery);

    const dbQuery2 = {
      text: `SELECT  _id, COUNT(*) FROM  sub_topics st WHERE ${condition} GROUP BY _id`,
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

const updateOneSubTopic = (data, _id) => {
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
      text: `UPDATE sub_topics SET (${columns.join(', ')}) = (${positions.join(
        ', '
      )}) WHERE _id = ${id_position}`,
      values,
    };

    return db.query(query);
  } catch (error) {
    throw error;
  }
};

const deleteOneSubTopic = (_id) => {
  try {
    const query = {
      text: `UPDATE sub_topics SET deleted_at = NOW()::timestamp WHERE _id = ${_id}`,
    };

    return db.query(query);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addOneSubTopic,
  readManySubTopics,
  updateOneSubTopic,
  deleteOneSubTopic,
};
