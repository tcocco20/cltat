import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CustomerIdentification, CustomerInfo } from "../types";

interface CustomerDetailsState {
  customerInfo: CustomerInfo | null;
  customerIdentification: CustomerIdentification | null;
  setCustomerInfo: (info: CustomerInfo) => void;
  setCustomerIdentification: (identification: CustomerIdentification) => void;
}

const initialState = {
  customerInfo: null,
  customerIdentification: null,
};

const createStore = (usePersist: boolean) =>
  usePersist
    ? persist(
        (set) => ({
          ...initialState,
          setCustomerInfo: (info: CustomerInfo) => set({ customerInfo: info }),
          setCustomerIdentification: (identification: CustomerIdentification) =>
            set({ customerIdentification: identification }),
        }),
        {
          name: "customer-details",
          storage: createJSONStorage(() => localStorage, {
            reviver: (_key, value) =>
              typeof value === "string" &&
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(value)
                ? new Date(value)
                : value,
            replacer: (_key, value) =>
              value instanceof Date ? value.toISOString() : value,
          }),
        }
      )
    : // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set: any) => ({
        ...initialState,
        setCustomerInfo: (info: CustomerInfo) => set({ customerInfo: info }),
        setCustomerIdentification: (identification: CustomerIdentification) =>
          set({ customerIdentification: identification }),
      });

const useCustomerDetailsStore = create<CustomerDetailsState>(
  // @ts-expect-error - factory has two possible shapes depending on environment
  typeof window !== "undefined" ? createStore(true) : createStore(false)
);

export default useCustomerDetailsStore;
