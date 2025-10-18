import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { updateDraftField } from "../../features/drafts/draftsSlice";
import type { RootState } from "../../app/store";
import type { ServiceLog } from "../../types";
interface DraftEditDialogProps {
  draftId: string | null;
  onClose: () => void;
}

export const DraftEditDialog = ({ draftId,onClose }: DraftEditDialogProps, ) => {
  const dispatch = useAppDispatch();

  const draft = useAppSelector((state: RootState) =>
    draftId ? state.drafts.drafts.find((d) => d.id === draftId) : null
  );

  const [localDraft, setLocalDraft] = React.useState<ServiceLog | null>(draft || null);
  const [open, setOpen] = React.useState(!!draftId);
  React.useEffect(() => {
    if (draft) setLocalDraft(draft);
  }, [draft]);

  if (!draft || !localDraft) return null;

  const handleChange = (field: keyof ServiceLog, value: string | number) => {
    setLocalDraft({ ...localDraft, [field]: value });
    dispatch(updateDraftField({ id: draft.id, field, value }));
  };

  

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
     

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg overflow-y-auto focus:outline-none">
          <Dialog.Title className="text-lg font-bold mb-2">Edit Draft</Dialog.Title>
          <Dialog.Description className="text-sm mb-4 text-gray-600">
            Make changes to your draft. Click "Save as Log" when done.
          </Dialog.Description>

          {/* Form Fields */}
          <fieldset className="mb-3 flex flex-col">
            <label className="text-sm font-medium mb-1">Provider ID</label>
            <input
              className="border rounded p-2"
              value={localDraft.providerId}
              onChange={(e) => handleChange("providerId", e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-3 flex flex-col">
            <label className="text-sm font-medium mb-1">Service Order</label>
            <input
              className="border rounded p-2"
              value={localDraft.serviceOrder}
              onChange={(e) => handleChange("serviceOrder", e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-3 flex flex-col">
            <label className="text-sm font-medium mb-1">Car ID</label>
            <input
              className="border rounded p-2"
              value={localDraft.carId}
              onChange={(e) => handleChange("carId", e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-3 flex flex-col">
            <label className="text-sm font-medium mb-1">Odometer (mi)</label>
            <input
              type="number"
              className="border rounded p-2"
              value={localDraft.odometer}
              onChange={(e) => handleChange("odometer", Number(e.target.value))}
            />
          </fieldset>

          <fieldset className="mb-3 flex flex-col">
            <label className="text-sm font-medium mb-1">Engine Hours</label>
            <input
              type="number"
              className="border rounded p-2"
              value={localDraft.engineHours}
              onChange={(e) => handleChange("engineHours", Number(e.target.value))}
            />
          </fieldset>

          <fieldset className="mb-3 flex flex-col">
            <label className="text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              className="border rounded p-2"
              value={localDraft.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-3 flex flex-col">
            <label className="text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              className="border rounded p-2"
              value={localDraft.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
            />
          </fieldset>

          <fieldset className="mb-3 flex flex-col">
            <label className="text-sm font-medium mb-1">Type</label>
            <select
              className="border rounded p-2"
              value={localDraft.type}
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <option value="">Select type</option>
              <option value="planned">Planned</option>
              <option value="unplanned">Unplanned</option>
              <option value="emergency">Emergency</option>
            </select>
          </fieldset>

          <fieldset className="mb-3 flex flex-col">
            <label className="text-sm font-medium mb-1">Service Description</label>
            <textarea
              className="border rounded p-2"
              rows={3}
              value={localDraft.serviceDescription}
              onChange={(e) => handleChange("serviceDescription", e.target.value)}
            />
          </fieldset>

          {/* Action Buttons */}
          <div className="mt-4 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400">
                Cancel
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button onClick={onClose}
                className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Save as Log
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Close asChild>
            <button
            onClick={onClose}
              className="absolute top-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
