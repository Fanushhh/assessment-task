import { useState } from "react";
import { Table } from "@radix-ui/themes";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  deleteDraft,
  clearDrafts,
} from "../../features/drafts/draftsSlice";
import type { RootState } from "../../app/store";
import { DraftEditDialog } from "./editLogModal";

export const DraftsTable = () => {
    const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const drafts = useAppSelector((state: RootState) => state.drafts.drafts);

  // Delete all drafts
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to delete all drafts?")) {
      dispatch(clearDrafts());
    }
  };
  const handleOpen = (draftId: string) => {
    setEditingDraftId(draftId);
    
  }
  const handleClose = () => {
    setEditingDraftId(null);
    
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-semibold">Drafts</h2>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          onClick={handleClearAll}
        >
          Delete All Drafts
        </button>
      </div>

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
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {drafts.map((draft) => (
            <Table.Row key={draft.id}>
              <Table.Cell>{draft.providerId}</Table.Cell>
              <Table.Cell>{draft.serviceOrder}</Table.Cell>
              <Table.Cell>{draft.carId}</Table.Cell>
              <Table.Cell>{draft.odometer}</Table.Cell>
              <Table.Cell>{draft.engineHours}</Table.Cell>
              <Table.Cell>{draft.startDate}</Table.Cell>
              <Table.Cell>{draft.endDate}</Table.Cell>
              <Table.Cell>{draft.type}</Table.Cell>
              <Table.Cell>{draft.serviceDescription}</Table.Cell>
              <Table.Cell className="flex gap-2">
                <button
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleOpen(draft.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => dispatch(deleteDraft(draft.id))}
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
          {drafts.length === 0 && (
            <Table.Row>
              <Table.Cell colSpan={10} className="text-center text-gray-500">
                No drafts available
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
      {editingDraftId && (
        <DraftEditDialog
          draftId={editingDraftId}
          key={editingDraftId}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

