/**
 * Convert an array of objects to a clean CSV string
 */
export const jsonToCSV = (items, fields) => {
  if (!items || items.length === 0) {
    return fields.map((f) => `"${f.label || f.key}"`).join(',') + '\n';
  }

  const header = fields.map((f) => `"${f.label || f.key}"`).join(',');
  const rows = items.map((item) => {
    return fields
      .map((f) => {
        let val = item[f.key];
        if (typeof f.getter === 'function') {
          val = f.getter(item);
        }
        if (val === null || val === undefined) {
          val = '';
        } else if (typeof val === 'object') {
          val = JSON.stringify(val);
        }
        const stringVal = String(val).replace(/"/g, '""');
        return `"${stringVal}"`;
      })
      .join(',');
  });

  return [header, ...rows].join('\n');
};
