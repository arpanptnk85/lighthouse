export function JsonInspector({ data }: { data: any }) {
  return (
    <pre className="text-xs bg-black/60 text-emerald-400 rounded-xl p-4 overflow-auto max-h-[400px]">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}
