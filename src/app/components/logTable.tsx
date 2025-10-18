import { useEffect, useState } from "react";
import { Table } from "@radix-ui/themes";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { getLogsFromStorage } from "../../features/logs/logsSlice";
import type { RootState } from "../../app/store";
import type { ServiceLog } from "../../types";

export const LogTable = () => {
  const dispatch = useAppDispatch();
  const logs = useAppSelector((state: RootState) => state.log.logs);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState(""); // planned | unplanned | emergency
  const [filterStartDate, setFilterStartDate] = useState(""); // yyyy-mm-dd
  const [filterEndDate, setFilterEndDate] = useState("");

  // Load logs on mount
  useEffect(() => {
    dispatch(getLogsFromStorage());
  }, [dispatch]);
  
  // Filtered logs
  const filteredLogs = logs.filter((log) => {
    // Search by providerId, carId, serviceOrder
    const matchesSearch =
      log.providerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.carId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.serviceOrder.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by type
    const matchesType = filterType ? log.type === filterType : true;

    // Filter by date range
    const matchesStartDate = filterStartDate
      ? new Date(log.startDate) >= new Date(filterStartDate)
      : true;
    const matchesEndDate = filterEndDate
      ? new Date(log.endDate) <= new Date(filterEndDate)
      : true;

    return matchesSearch && matchesType && matchesStartDate && matchesEndDate;
  });

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Provider / Car / Order"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Types</option>
          <option value="planned">Planned</option>
          <option value="unplanned">Unplanned</option>
          <option value="emergency">Emergency</option>
        </select>
        <input
          type="date"
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
          className="border rounded p-2"
        />
        <input
          type="date"
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
          className="border rounded p-2"
        />
      </div>

      {/* Table */}
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Provider ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Service Order</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Car ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Odometer(mi)</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Engine Hours</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Start Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>End Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Service Description</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {filteredLogs.map((log:ServiceLog) => (
            <Table.Row key={log.id}>
              <Table.Cell>{log.providerId}</Table.Cell>
              <Table.Cell>{log.serviceOrder}</Table.Cell>
              <Table.Cell>{log.carId}</Table.Cell>
              <Table.Cell>{log.odometer}</Table.Cell>
              <Table.Cell>{log.engineHours}</Table.Cell>
              <Table.Cell>{log.startDate}</Table.Cell>
              <Table.Cell>{log.endDate}</Table.Cell>
              <Table.Cell>{log.type}</Table.Cell>
              <Table.Cell>{log.serviceDescription}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
