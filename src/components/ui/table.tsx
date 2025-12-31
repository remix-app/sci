import React from 'react'

export function Table({ children }: any) {
  return <table className="w-full border-collapse">{children}</table>
}

export function TableHeader({ children }: any) {
  return <thead className="bg-gray-100">{children}</thead>
}

export function TableBody({ children }: any) {
  return <tbody>{children}</tbody>
}

export function TableRow({ children }: any) {
  return <tr className="border-b">{children}</tr>
}

export function TableCell({ children }: any) {
  return <td className="px-4 py-2">{children}</td>
}

export function TableHead({ children }: any) {
  return <th className="px-4 py-2 text-left font-semibold">{children}</th>
}
