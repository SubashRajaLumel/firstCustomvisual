export const transformMatrixToTable = (matrix) => {
  const rows = matrix.rows.root.children;
  const columns = matrix.columns.root.children;
  const valueSources = matrix.valueSources;

  // Get the row and column headers
  const rowHeaders = matrix.rows.levels.map(
    (level) => level.sources[0].displayName
  );
  const columnHeaders = columns.map((col) => col.levelValues[0].value);

  // Helper function to get values
  function getValue(values, columnIndex) {
    if (
      values &&
      values[columnIndex] &&
      values[columnIndex].value !== undefined
    ) {
      return values[columnIndex].value;
    }
    return null;
  }

  // Recursive function to traverse the row hierarchy
  function traverseRows(node, rowValues = {}) {
    const currentLevel = node.levelValues.map((level) => level.value);
    rowValues[rowHeaders[node.level]] = currentLevel[0];

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => traverseRows(child, { ...rowValues }));
    } else {
      const rowResult = [];
      columns.forEach((col, colIndex) => {
        const columnName = columnHeaders[colIndex];
        const values = node.values || {};
        const row = { ...rowValues, [columnName]: {} };

        valueSources.forEach((source, valueIndex) => {
          row[columnName][source.displayName] = getValue(values, valueIndex);
        });

        rowResult.push(row);
      });
      result.push(...rowResult);
    }
  }

  const result = [];
  rows.forEach((row) => traverseRows(row));

  // Flatten the nested value structure for the table
  return result.map((row) => {
    const flattenedRow = {};
    rowHeaders.forEach((header) => {
      flattenedRow[header] = row[header];
    });
    columnHeaders.forEach((column) => {
      valueSources.forEach((source) => {
        flattenedRow[`${column} ${source.displayName}`] =
          row[column][source.displayName];
      });
    });
    return flattenedRow;
  });
};

export const getArrayOfObjAsObj = (array, key) => {
  const resultObj = {};
  if (!key || !array?.length) return resultObj;
  array.forEach((value) => {
    resultObj[value[key]] = value;
  });
  return resultObj;
};
