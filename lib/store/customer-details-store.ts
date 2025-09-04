import { create } from "zustand";
import {
  CustomerDetails,
  CustomerIdentification,
  CustomerInfo,
} from "../types";

interface CustomerDetailsState {
  customerDetails: CustomerDetails | null;
  customerInfo: CustomerInfo | null;
  customerIdentification: CustomerIdentification | null;
  setCustomerInfo: (info: CustomerInfo) => void;
  setCustomerIdentification: (identification: CustomerIdentification) => void;
  setCustomerDetails: (
    info: CustomerInfo,
    identification: CustomerIdentification
  ) => void;
}

const useCustomerDetailsStore = create<CustomerDetailsState>((set) => ({
  customerDetails: null,
  customerInfo: null,
  customerIdentification: null,
  setCustomerInfo: (info: CustomerInfo) => set({ customerInfo: info }),
  setCustomerIdentification: (identification: CustomerIdentification) =>
    set({ customerIdentification: identification }),
  setCustomerDetails: (
    info: CustomerInfo,
    identification: CustomerIdentification
  ) => set({ customerDetails: { ...info, ...identification } }),
}));

export default useCustomerDetailsStore;
