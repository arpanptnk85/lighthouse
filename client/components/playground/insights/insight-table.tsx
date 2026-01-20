type Props = {
  data: Record<string, any>[];
};

export function InsightTable({ data }: Props) {
  const columns = Object.keys(data[0]);

  return (
    <div className="max-h-[20vh] rounded-xl border border-border overflow-auto">
      <table className="w-full text-sm">
        <thead className="bg-muted/40">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="px-4 py-2 text-left text-xs font-bold uppercase tracking-widest"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-border/50">
              {columns.map((col) => (
                <td key={col} className="px-4 py-1">
                  {String(row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
