// signalingStore.ts
interface SignalingStore {
    ceoOffer: RTCSessionDescriptionInit | null;
    managerAnswer: RTCSessionDescriptionInit | null;
    employeeAnswer: RTCSessionDescriptionInit | null;
    iceCandidates: {
      ceo: RTCIceCandidateInit[];
      manager: RTCIceCandidateInit[];
      employee: RTCIceCandidateInit[];
    };
    sharedText: string; // Add this
  }
  
  const signalingStore: SignalingStore = {
    ceoOffer: null,
    managerAnswer: null,
    employeeAnswer: null,
    iceCandidates: { ceo: [], manager: [], employee: [] },
    sharedText: "", // Initialize this
  };
  
  export default signalingStore;