'use client'

import TableHeaderActions from './TableHeaderActions/TableHeaderActions'

export default function TableHeader() {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex gap-4">
                <TableHeaderActions />
            </div>
        </div>
    )
}
