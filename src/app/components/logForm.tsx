import { Form } from "radix-ui";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { updateDraftField, createDraft, clearDrafts } from "../../features/drafts/draftsSlice";
import { addLog } from "../../features/logs/logsSlice";
import type { RootState } from "../store";
import type { ServiceLog } from "../../types";
import { CheckCircledIcon, FaceIcon, ImageIcon, SunIcon } from "@radix-ui/react-icons"

export function LogForm() {
const dispatch = useAppDispatch();
  const [showStatus, setShowStatus] = React.useState(false);
  // Get the current draft (for this simple form, we’ll just use the first one)
  const draft = useAppSelector((state: RootState) => state.drafts.drafts[0]);
  const saveStatus = useAppSelector((state) => state.drafts.status);

  // Create a draft on mount if none exists
  useEffect(() => {
    if (!draft) {
      dispatch(createDraft());
    }
  }, [dispatch, draft]);
  useEffect(() => {
    if (saveStatus === "saved") {
      setShowStatus(true)
    }else{
      setShowStatus(false)
    }

  }, [saveStatus])

  // Handle autosave as user types
  const handleChange = (field: keyof ServiceLog, value: string | number) => {
    if (!draft) return;
    dispatch(updateDraftField({ id: draft.id, field, value }));
  };

  // Handle submit (convert draft → log)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft) return;

    // Minimal validation
    if (!draft.providerId || !draft.serviceOrder || !draft.carId) {
      alert("Please fill all required fields.");
      return;
    }

    // Save log and clear draft
    dispatch(addLog(draft));
    dispatch(clearDrafts());
    alert("Service log saved successfully!");
  };

  if (!draft) return null; // Wait for initial draft to be created
  

  return (
    <section>
      <Form.Root onSubmit={handleSubmit} className="w-[500px] grid mx-auto">
        <Form.Field className="mb-2.5 grid" name="providerId">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] ">
              Provider ID
            </Form.Label>
            <Form.Message
              className="text-[13px] errorMessage opacity-80"
              match="valueMissing"
            >
              Please enter your provider id
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none  shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection: hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              type="text"
              value={draft.providerId}
              onChange={(e) => handleChange("providerId", e.target.value)}
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-2.5 grid" name="serviceOrder">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] ">
             Service Order
            </Form.Label>
            <Form.Message
              className="text-[13px] errorMessage opacity-80"
              match="valueMissing"
            >
              Please enter your service order
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none  shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection: hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              required
              type="text"
              value={draft.serviceOrder}
              onChange={(e) => handleChange("serviceOrder", e.target.value)}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-2.5 grid" name="carId">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] ">
             Car ID
            </Form.Label>
            <Form.Message
              className="text-[13px] errorMessage opacity-80"
              match="valueMissing"
            >
              Please enter your car ID
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none  shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection: hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              required
              value={draft.carId}
              onChange={(e) => handleChange("carId", e.target.value)}
              type="text"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-2.5 grid" name="odometer">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] ">
             Odometer (mi)
            </Form.Label>
            <Form.Message
              className="text-[13px] errorMessage opacity-80"
              match="valueMissing"
            >
              Please enter your odometer miles
            </Form.Message>
            <Form.Message
              className="text-[13px] errorMessage opacity-80"
              match="patternMismatch"
            >
              Please enter a valid number
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none  shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection: hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              required
              type="text"
              value={draft.odometer}
              onChange={(e) => handleChange("odometer", e.target.value)}
              pattern="^\d+(?:[.,]\d+)?$"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-2.5 grid" name="engineHours">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] ">
             Engine Hours
            </Form.Label>
            <Form.Message
              className="text-[13px] errorMessage opacity-80"
              match="valueMissing"
            >
              Please enter your engine hours
            </Form.Message>
            <Form.Message
              className="text-[13px] errorMessage opacity-80"
              match="patternMismatch"
            >
              Please enter a valid number
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none  shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection: hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              required
              value={draft.engineHours}
              onChange={(e) => handleChange("engineHours", e.target.value)}
              type="text"
              pattern="^\d+(?:[.,]\d+)?$"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-2.5 grid" name="startDate">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] ">
             Start date
            </Form.Label>
            <Form.Message
              className="text-[13px] errorMessage opacity-80"
              match="valueMissing"
            >
              Please enter your start date
            </Form.Message>
            
          </div>
          <Form.Control asChild>
            <input
              className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none  shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection: hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              required
              type="date"
              value={draft.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-2.5 grid" name="endDate">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] ">
             End date
            </Form.Label>
            <Form.Message
              className="text-[13px] errorMessage opacity-80"
              match="valueMissing"
            >
              Please enter your end date
            </Form.Message>
            
          </div>
          <Form.Control asChild>
            <input
              className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none  shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection: hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              required
              value={draft.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              disabled={true}
              type="date"
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-2.5 grid" name="type">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] ">
             Service Type
            </Form.Label>
            <Form.Message
              className="text-[13px] errorMessage opacity-80"
              match="valueMissing"
            >
              Please enter your service type
            </Form.Message>
            
          </div>
          <Form.Control asChild>
            <select
              className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none  shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection: hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              required
              value={draft.type}
              onChange={(e) => handleChange("type", e.target.value)}
            >
              <option value=""></option>
              <option value="planned">Planned</option>
              <option value="unplanned">Unplanned</option>
              <option value="emergency">Emergency</option>
            </select>
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-2.5 grid" name="serviceDescription">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] ">
             Service description
            </Form.Label>
            <Form.Message
              className="text-[13px] errorMessage opacity-80"
              match="valueMissing"
            >
              Please enter some details
            </Form.Message>
            
          </div>
          <Form.Control asChild>
            <textarea
              className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none  shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection: hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              required
              value={draft.serviceDescription}
              onChange={(e) => handleChange("serviceDescription", e.target.value)}
              rows={3}
            />
             
            
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="mt-2.5 box-border inline-flex h-[35px] w-full items-center justify-center rounded bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            Save log
          </button>
           
        </Form.Submit>
        {showStatus && <p className="text-sm italic text-gray-500 mt-2 text-green-500 ml-1 flex my-4">
          {saveStatus === "saved" && <CheckCircledIcon  className="mr-2"/>}
          {saveStatus === "saving"
            ? "Saving..."
            : saveStatus === "saved"
            ? "Draft saved."
            : ""}
            	
			


        </p>}
      </Form.Root>
    </section>
  );
}
